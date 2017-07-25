function Snap()
{
	this.construct = function()
	{
		this.__init__();
	};
	
	this.__init__ = function()
	{	
		this.ajax = new ajax();
	};
	
	this.error_display_type = "";
	this.dbConnection = 0;
	this.messageQueue = [];
	this.onTasksDone = undefined;
	
	this.errorReporting = function(type)
	{
		if(type)
		{
			this.error_display_type = type;
		}
		else
		{
			this.error_display_type = "alert";
		}
	};
	
	this.setProfile = function(profile)
	{
		if(profile)
		{
			this.profile = profile;
		}
	};
	
	this.connectToDB = function(dbms, credentials, callback)
	{
		this.ajax.queueMessage
		(
			{
				'url':      "./php/commands.php",
				'data_type': "json",
				'data':		
				{
					"command":     "connect_db",
					"dbms":		   dbms,
					"username":	   credentials['username'],
					"password":	   credentials['password'],
					"database":	   credentials['database']
				},
				'success': function(data)
				{	
					if(data['db_conn'] === true)
					{
						console.log("SNAP: Connected to database successfully!");
					}
					else
					{
						alert("SNAP: Couldn't connect to database.");
						console.log("SNAP: Couldn't connect to database.");
					}
				},
				'error': function(data)
				{
					error_log(data['error']);
				}
			}
		);
	};
	
	this.execQuery = function(sql, callback)
	{
		var self = this;
		this.ajax.queueMessage
		(
			{
				'url':       "./php/commands.php",
				'data_type': "JSON",
				'data':     
				{ 
					"database": "test",
					"command": "exec_query",
					"handle" : 0, 
					"sql" :	   sql 
				},
				'success':  function(data)
				{
					console.log("SNAP: Query executed successfully!");
				}
			}
		);	
	};
	
	this.sanitizeSQL = function(sql, params)
	{
		var param_sql = sql;
		for(var param in params)
		{
			param_sql.replace('?', '\\'+param.replace(" ","+")+'\\');
		}
		return param_sql;
	}
		
	this.fileExists = function(file)
	{
		console.log("Checking if file exists...");
		this.ajax.queueMessage({
				'url':         "./server.php",
				'data_type':   "JSON",
				'data':     
				{
					"command" : "file_exists",
					"filename": file
				},
				'success':  function(data)
				{
				}
			});
	};
	
	this.doTasks = function()
	{
		this.ajax.doTasks(this.onTasksDone);	
	};
};
