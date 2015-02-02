var incidentFormValidationRules = {
    ClientName: {
        identifier: "ClientName",
        rules: [{
            type: 'empty',
            prompt: 'Choose a client'
        }]
    },
    ClientContact: {
        identifier: "ClientContact",
        rules: [{
            type: 'empty',
            prompt: 'Please provide the name of the person from the client that we should contact'
        }]
    },
    ClientPhone: {
        identifier: "ClientPhone",
        rules: [{
            type: 'empty',
            prompt: 'Please enter a phone number for the person mentioned above'
        }]
    },
    IncidentDescription: {
        identifier: "IncidentDescription",
        rules: [{
            type: 'empty',
            prompt: 'Please enter a description of the incident as told by the client'
        }]
    }
}

$(document)
    .ready(function() {
        $('.standard.support.modal').modal();
        $('.ui.form').form(incidentFormValidationRules, {
            on: 'blur',
            inline: 'true'
        });
    });
