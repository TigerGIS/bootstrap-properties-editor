# bootstrap-properties-editor

If you have a model instance like this:

```JavaScript
function Label() {

  // Properties
	this.text = 'hello world';
	this.width = 10;
	
	// Configuration used by editor
	this.configuration = [ 
		{ 
			'name': 'Text',
			'type' : 'string',
			'field': 'text'
		}, 
		{ 
			'name': 'Width', 
			'type' : 'int',
			'field': 'width'
		}
	];
}
```

then boostrap-properties-editor would generate a form like this:
