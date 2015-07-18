function PropertiesDialog(modalDivId, bodyDivId, titleDivId, onPropertiesSet) {
	this.configHtml = '';
	this.component = null;
	this.title = '';
	this.modalDivId = modalDivId;
	this.bodyDivId = bodyDivId;
	this.titleDivId = titleDivId;
	this.onPropertiesSet = onPropertiesSet;
}

PropertiesDialog.prototype.open = function(component, title) {

	// Set modal window title
	$('#' + this.titleDivId).html(title);

	this.component = component;

	// Prepare modal window
	this.configHtml = '<div class="form-group">';
	var config = component.configuration;

	for (var i=0; i!=config.length; i++) {
		switch(config[i].type) {
			case 'int':
				this.configHtml += '<label for="props_'+config[i].field+'">' + config[i].name + ':</label>';
				this.configHtml += '<input type="number" class="form-control" id="props_'+config[i].field+'" value="'+component[config[i].field]+'">';
				break;

			case 'string':
				this.configHtml += '<label for="props_'+config[i].field+'">' + config[i].name + ':</label>';
				this.configHtml += '<input type="text" class="form-control" id="props_'+config[i].field+'" value="'+component[config[i].field]+'">';
				break;

			case 'text':
			    this.configHtml += '<label for="props_'+config[i].field+'">' + config[i].name + ':</label>';
				this.configHtml += '<textarea class="form-control" rows="5" id="props_'+config[i].field+'">'+component[config[i].field]+'</textarea>';
				break;

			case 'dropdown':
				this.configHtml += '<label for="props_'+config[i].field+'">' + config[i].name + ':</label>';
				this.configHtml += '<select id="props_'+config[i].field+'" class="form-control">';
				for (var j=0; j!=config[i].options.length; j++) {
					this.configHtml += '<option value="'+config[i].options[j].key+'"" '+((component[config[i].field] == config[i].options[j].key) ? 'SELECTED' : '')+'>'+config[i].options[j].value+'</option>';
				}
				this.configHtml += '</select>';
				break;

			case 'boolean':
				this.configHtml += '<div class="checkbox">';
				this.configHtml += '<label><input '+((component[config[i].field]) ? 'CHECKED' : '')+' type="checkbox" class="checkbox" id="props_'+config[i].field+'"> ' + config[i].name + '</label>';
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

		this.component[this.component.configuration[i].field] = selectedValue;
	}

	if (validForm) {
		$('#' + this.modalDivId).modal('hide');
		this.onPropertiesSet(this.component);
	}
}