(function ($) {

  


    Drupal.behaviors.NR6_25 = {
        attach: function (context, settings) {
            jQuery('input.numeric').on('keypress', function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });

            jQuery('input.float').on('keypress', function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });
        }
    }


})(jQuery)

webform.validators.NR6_25 = function (v, allowOverpass) {
    var values = Drupal.settings.mywebform.values;


    validatePhoneNumber(values.PHONE);

    validateRow1AgainstOtherRows();
 



    //Sort warnings & errors
    webform.warnings.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.errors.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.validatorsStatus['NR6_25'] = 1;
    validateWebform();

}

function concatMessage(errorCode, fieldTitle, msg) {
    var titleParts = [];

    if (errorCode) {
        titleParts.push(getErrorMessage(errorCode));
    }

    if (fieldTitle) {
        titleParts.push(fieldTitle);
    }

    if (titleParts.length) {
        msg = titleParts.join(', ') + '. ' + msg;
    }

    return msg;

}

function getErrorMessage(errorCode) {
    return Drupal.t('Error code: @error_code', { '@error_code': errorCode });
}

function validatePhoneNumber(phone) {
    // Check if the phone number is valid (exactly 9 digits)
    if (!phone || !/^[0-9]{9}$/.test(phone)) {
        webform.errors.push({
            'fieldName': 'PHONE',
            'weight': 29,
            'msg': concatMessage('A.09', '', Drupal.t('Introduceți doar un număr de telefon format din 9 cifre'))
        });
    }

    // Check if the first digit is 0
    if (phone && phone[0] !== '0') {
        webform.errors.push({
            'fieldName': 'PHONE',
            'weight': 30,
            'msg': concatMessage('A.09', '', Drupal.t('Prima cifră a numărului de telefon trebuie să fie 0'))
        });
    }
}

//---------------------------------------------------

function validateRow1AgainstOtherRows() {
    // Get the values object from Drupal settings
    var values = Drupal.settings.mywebform.values;

    // Retrieve the value for rând.1 col.1
    var col1Row1 = Number(values['CAP1_R1_C1'] || 0); // Assuming this is the key for rând.1 col.1

    // Define the rows to compare against rând.1 col.1
    var rows = [
        { key: 'CAP1_R2_C1', rowName: 'rând.2' },
        { key: 'CAP1_R3_C1', rowName: 'rând.3' },
        { key: 'CAP1_R4_C1', rowName: 'rând.4' },
        { key: 'CAP1_R5_C1', rowName: 'rând.5' },
        { key: 'CAP1_R6_C1', rowName: 'rând.6' }
    ];

    // Iterate through each row and validate the condition
    rows.forEach(row => {
        var col1Value = Number(values[row.key] || 0); // Get the value of the current row's col.1

        // Check if rând.1 col.1 is less than the current row's col.1
        if (col1Row1 < col1Value) {
            // Push an error to the webform errors array
            webform.errors.push({
                fieldName: row.key, // Use the key as the field name
                weight: 1,
                msg: concatMessage(
                    'R1.01',
                    `${row.rowName} col.1`,
                    Drupal.t(`Valoarea din rândul 1, col.1 (${col1Row1}) trebuie să fie mai mare sau egală cu valoarea din ${row.rowName} col.1 (${col1Value}).`)
                )
            });
        }
    });
}








//--------------------------------------------------------


function sort_errors_warinings(a, b) {
    if (!a.hasOwnProperty('weight')) {
        a.error_code = 9999;
    }

    if (!b.hasOwnProperty('weight')) {
        b.error_code = 9999;
    }

    return toFloat(a.error_code) - toFloat(b.error_code);
}