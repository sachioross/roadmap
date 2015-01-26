var cardFormValidationRules = {
    CardName: {
        identifier: "CardName",
        rules: [{
            type: 'empty',
            prompt: 'Please enter a concise title for the request'
        }]
    },
    Description: {
        identifier: "CardDescription",
        rules: [{
            type: 'empty',
            prompt: 'Please provide a detailed description for the team!'
        }]
    }
}

$(document)
    .ready(function() { 
        $('.addcard.modal').modal({allowMultiple: true});
        $('.standard.addcard.modal').modal('attach events', '.addcard.button');
        $('.ui.form').form(cardFormValidationRules, {
            on: 'blur',
            inline: 'true'
        });
        $('.requested-features.modal').modal('attach events', '.requestedfeatures.button');
    });
