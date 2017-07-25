function ajax()
{
	this.xmlHttpObj = [];
	this.xmlHttpMessage = undefined;
	this.messageStack = [];
	this.deferObj = undefined;
	this.response = undefined;
	
	this.initAjax = function(message)
	{
		if(XMLHttpRequest)
		{
			this.xmlHttpObj = new XMLHttpRequest();
		}
		else
		{
			this.xmlHttpObj = new ActiveX();
		}
		this.messageStack.push(message);
	};
	
	this.ajaxReady = function()
	{
		return Utensils.Object.areEqual(this.xmlHttpObj.status, 200) && Utensils.Object.areEqual(this.xmlHttpObj.readyState, 4);
	};
	
	this.ajaxError = function()
	{
		return Utensils.Object.areEqual(this.xmlHttpObj.status, 404);
	};
	
	this.getAjaxError = function()
	{
		this.xmlHttpMessage.error(this.xmlHttpObj.responseText);
	}
	
	this.getAjaxResponse = function()
	{
		var data_type = this.xmlHttpMessage.data_type;
		var type_defined = Utensils.Object.isDefined(data_type); 
		var is_json = Utensils.Object.areEqual(data_type.toLowerCase(), "json");
		
		var response_text = this.xmlHttpObj.responseText;
		alert(response_text);
		//this.response = Utensils.Object.ifCondition(type_defined && is_json, JSON.parse(response_text), response_text);
		this.xmlHttpMessage.success(this.response);
		this.sendAjaxRequest();
	};
	
	this.queueMessage = function(message)
	{
		var self = this;
		self.initAjax(message);
		self.xmlHttpObj.onreadystatechange = function()
		{
			if(self.ajaxReady())
			{
				self.getAjaxResponse();	
			}
			else if(self.ajaxError())
			{
				self.getAjaxError();
			}
		};
		self.buildAjaxUrl();
	};
	
	this.sendAjaxRequest = function()
	{
		if(this.messageStack.length > 0)
		{
			this.xmlHttpMessage = this.messageStack.shift(0);
			
			var method = Utensils.Object.ifCondition(Utensils.Object.isFunction(this.xmlHttpMessage.method), this.xmlHttpMessage.method, "GET");
			var async = Utensils.Object.ifCondition(Utensils.Object.isFunction(this.xmlHttpMessage.async), this.xmlHttpMessage.async, true);
			var url = this.xmlHttpMessage.url;
			
			this.xmlHttpObj.open(method, url, async);
			if(method.toLowerCase() === "post")
			{
				this.xmlHttpObj.setResponseHeaders("content-type", "form-data");
			}
			this.xmlHttpObj.send((method.toLowerCase() ==="post") ? url : null);
		}
		else if(this.messageStack.length === 0)
		{
			this.callback(this.response);
		}
	}
	
	this.buildAjaxUrl = function()
	{
		var kvp = [];
		var msg_size = this.messageStack.length-1;
		var msg = this.messageStack[msg_size];
		for(key in msg.data)
		{
			kvp.push([key, msg.data[key]].join("="));
		}
		this.messageStack[msg_size].url = msg.url+"?"+kvp.join("&");
	};
		
	this.defer = function(deferee)
	{
		var self = this;
		self.deferObj = deferee;
	};
	
	this.doTasks = function(callback)
	{
		this.callback = callback;
		this.sendAjaxRequest();
	}
}