function PropertiesDialog(containerDivId, onPropertiesSet) {
	this.configHtml = '';
	this.component = null;
	this.title = '';
	this.dialogId = 'dialog_'+Math.floor(Math.random() * 10000);
	this.modalDivId = 'ctrl'+Math.floor(Math.random() * 10000);
	this.bodyDivId = 'ctrl'+Math.floor(Math.random() * 10000);
	this.titleDivId = 'ctrl'+Math.floor(Math.random() * 10000);
	this.onPropertiesSet = onPropertiesSet;
	
	this.renderForm(containerDivId);

	// Register dialog in global variable
	if (window.propertiesDialogPool == undefined) {
		window.propertiesDialogPool = [];
	}

	window.propertiesDialogPool[this.dialogId] = this;
}

PropertiesDialog.prototype.open = function(component, title) {

	// Set modal window title
	$('#' + this.titleDivId).html(title);

	this.component = component;

	// Prepare modal window
	this.configHtml = '<div class="form-group">';
	var config = component.configuration;

	for (var i=0; i!=config.length; i++) {
		var value = component[config[i].field];
		if (config[i].htmlEscape != undefined && config[i].htmlEscape == true) {
			value = htmlUnescape(value);
		}

		switch(config[i].type) {
			case 'int':
				this.configHtml += '<label for="props_'+config[i].field+'">' + config[i].name + ':</label>';
				this.configHtml += '<input type="number" class="form-control" id="props_'+config[i].field+'" value="'+value+'">';
				break;

			case 'string':
				this.configHtml += '<label for="props_'+config[i].field+'">' + config[i].name + ':</label>';
				this.configHtml += '<input type="text" class="form-control" id="props_'+config[i].field+'" value="'+value+'">';
				break;

			case 'text':
			    this.configHtml += '<label for="props_'+config[i].field+'">' + config[i].name + ':</label>';
				this.configHtml += '<textarea class="form-control" rows="5" id="props_'+config[i].field+'">'+value+'</textarea>';
				break;

			case 'dropdown':
				this.configHtml += '<label for="props_'+config[i].field+'">' + config[i].name + ':</label>';
				this.configHtml += '<select id="props_'+config[i].field+'" class="form-control">';
				for (var j=0; j!=config[i].options.length; j++) {
					this.configHtml += '<option value="'+config[i].options[j].key+'"" '+((value == config[i].options[j].key) ? 'SELECTED' : '')+'>'+config[i].options[j].value+'</option>';
				}
				this.configHtml += '</select>';
				break;

			case 'boolean':
				this.configHtml += '<div class="checkbox">';
				this.configHtml += '<label><input '+(value == true ? 'CHECKED' : '')+' type="checkbox" class="checkbox" id="props_'+config[i].field+'"> ' + config[i].name + '</label>';
				this.configHtml += '</div>';
				break;
		}
	}

	this.configHtml += '</div>';
	$('#' + this.bodyDivId).html(this.configHtml);

	// Open modal window
	$('#' + this.modalDivId).modal('show');

}

PropertiesDialog.prototype.saveProperties = function() {
	var validForm = true;

	for(var i=0; i!=this.component.configuration.length; i++) {
		var selectedValue = $('#props_'+this.component.configuration[i].field).val();
		
		if (this.component.configuration[i].type == 'int' && selectedValue == '') {
			 BootstrapDialog.alert({ 
			 		message: 'Invalid input: ' + this.component.configuration[i].name,
			 		type: BootstrapDialog.TYPE_WARNING,
			 		title: 'Validation',
			 		closable: true,
			 	}
			);
			validForm = false;
		}

		if (this.component.configuration[i].htmlEscape != undefined && this.component.configuration[i].htmlEscape == true) {
			selectedValue = htmlEscape(selectedValue);
		} 

		this.component[this.component.configuration[i].field] = selectedValue;
	}

	if (validForm) {
		$('#' + this.modalDivId).modal('hide');
		this.onPropertiesSet(this.component);
	}
}

PropertiesDialog.prototype.renderForm = function(containerDivId) {

	var content = '<div class="modal fade" id="'+this.modalDivId+'" role="dialog">'+
    '<div class="modal-dialog">'+
    
      '<div class="modal-content">'+
        '<div class="modal-header">'+
          '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
          '<h4 class="modal-title" id="'+this.titleDivId+'">Properties</h4>'+
        '</div>'+
        '<div class="modal-body" id="'+this.bodyDivId+'">'+
        
        '</div>'+
        '<div class="modal-footer">'+
          '<button onClick="window.propertiesDialogPool[\''+this.dialogId+'\'].saveProperties();" type="button" class="btn btn-primary">OK</button>'+
          '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
        '</div>'+
      '</div>'+
      
    '</div>'+
  '</div>';

  $('#' + containerDivId).append(content);

}

function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/\n/g, '\\n')
            .replace(/>/g, '&gt;');
}

// I needed the opposite function today, so adding here too:
function htmlUnescape(value){
    return String(value)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\\n/g, '\n')
        .replace(/&amp;/g, '&');
}