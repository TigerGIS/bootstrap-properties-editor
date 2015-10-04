# bootstrap-properties-editor

If you have a model instance like this:

```JavaScript
function Person() {
	this.name = 'John Doe';
	this.age = 32;
	this.comment = 'Some comment, long text';
	this.isMale = true;
	this.state = '';

	this.configuration = [ 
		{ 
			'name': 'Name',
			'type' : 'string',
			'field': 'name',
			'htmlEscape': true,
		}, 
		{ 
			'name': 'Age', 
			'type' : 'int',
			'field': 'age'
		},
		{ 
			'name': 'Comment', 
			'type' : 'text',
			'field': 'comment',
			'htmlEscape': true,
		},
		{ 
			'name': 'Is male?', 
			'type' : 'boolean',
			'field': 'isMale'
		},
		{ 
			'name': 'State', 
			'type' : 'dropdown',
			'field': 'state',
			'options': [ 
				{ 'key': 'CA', 'value': 'California' }, 
				{ 'key': 'FL', 'value': 'Florida' },
				{ 'key': 'NV', 'value': 'Nevada' },
				{ 'key': 'NJ', 'value': 'New Jersey' },
				{ 'key': 'TX', 'value': 'Texas' },
				{ 'key': 'WY', 'value': 'Wyoming' } 
			]
		}
	];
}
```

then boostrap-properties-editor would generate a form like this:

![Generated form](https://github.com/akos-sereg/bootstrap-properties-editor/blob/master/screenshot.png?raw=true "Screenshot")

by callig

```JavaScript
var subject = new Person();

var propertiesDialog = new PropertiesDialog('propertiesDiv',
	function(component) { 
		BootstrapDialog.alert('Properties set'); 
	});

propertiesDialog.open(subject, 'Component Properties');
```
