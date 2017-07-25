var Utensils = 
{
	Object:
	{
		isString: function(obj)
		{
			return (Utensils.Object.areEqual(typeof obj, "string") || obj instanceof String);
		},
		isDefined: function(obj)
		{
			return !Utensils.Object.areEqual(typeof obj, "undefined");
		},
		isNumber: function(obj)
		{
			return !Utensils.Object.areEqual(typeof obj, "number");
		},
		isFunction: function(obj)
		{
			return (Utensils.Object.areEqual(typeof obj, "function"));
		},
		areEqual: function(obj1, obj2)
		{
			return (obj1 === obj2 && Utensils.Object.isDefined(obj1) && Utensils.Object.isDefined(obj2));
		},
		ifCondition: function(cond, true_path, false_path)
		{
			if(Utensils.Object.isDefined(cond))
			{
				return (cond === true) ? true_path : false_path;
			}
			else
			{
				return false;
			}
		},
		Keys: function(obj)
		{
			if(Object.keys)
			{
				return Object.keys(obj);
			}
			else
			{
				keys = [];
				for(key in obj)
				{
					keys.push(key);
				}
				return keys;
			}
		}
	},
	Events:
	{
		bindEventCallback: function(obj, callback)
		{
			if(Utensils.Object.isDefined(obj))
			{
				var allowed_list = obj;
				var prefix = "";
				
				for(event in obj)
				{
					if(Utensils.Object.isString(event))
					{
						prefix = event.substr(0, 2);
						if(Utensils.Object.isDefined(obj[me]))
						{
							obj[me] = callback();
						}
					}
				}
				return event_callback;
			}
		}
	}
};
