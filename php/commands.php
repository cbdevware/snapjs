<?php

error_reporting(E_ALL);

session_start();

if(isset($_GET))
{
	$return = array();
	foreach($_GET as $key => $value);
	{
		$$key = strip_tags($value); 
	}
	
	switch($_GET['command'])
	{
		case 'file_exists':
			if(file_exists($_GET['filename']))
			{
				$return['exists'] = true;
			}
			else
			{
				$return['exists'] = false;
			}
			break;
			
		case 'read_file':
			$return['data'] = file_get_contents($_GET['file']);
			break;
			
		case 'connect_db':
			error_log("asdasdas");
			if(isset($_GET['dbms']) && $_GET['dbms'] === 'mysql')
			{
				$_SESSION['db'][0] = new mysqli();
				if($_SESSION['db'][0]->connect('localhost', $_GET['username'], $_GET['password']) !== false)
				{
					$return['db_conn'] = true;
				}
				else
				{
					$return['error'] = "SnapJS ERROR: Can't connect to mysql database '".$_GET['database']."': ".mysql_error();
				}
			}
			break;

		case 'select':
			$return['result'] = "";
			break;
		
		case 'exec_query':
			$_SESSION['db'][0]->select_db('test');
			
			$result = $_SESSION['db'][0]->query($_GET['sql']);
			$result_set = array();
			if($result)
			{
				while(($row = $_SESSION['db'][0]->fetch_assoc($result)) !== false)
				{
					$result_set[] = $row;
				}
				$return['result'] = $result_set;	
			}
			else
			{
				$return['error'] = mysql_error();
			}
			break;
			
		case 'close_db':
			$return['closed'] = mysql_close($_SESSION['db']);
			break;
	}
	print json_encode($return);
}

?>