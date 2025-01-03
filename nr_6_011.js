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
    validateRow1Col1();



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

    // Retrieve and validate the value for rând.1 col.1
    var col1Row1 = Number(values['CAP1_R1_C1']);
    col1Row1 = isNaN(col1Row1) ? 0 : col1Row1; // Ensure no NaN for col.1 rând.1

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
        // Get and validate the value of the current row's col.1
        var col1Value = Number(values[row.key]);
        col1Value = isNaN(col1Value) ? 0 : col1Value; // Ensure no NaN

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

function validateRow1Col1() {
    // Get the values object from Drupal settings
    var values = Drupal.settings.mywebform.values;

    // Retrieve and validate the value for Rind.1 COL1
    var col1Row1 = Number(values['CAP1_R1_C1']);
    col1Row1 = isNaN(col1Row1) ? 0 : col1Row1; // Ensure no NaN for COL1 Rind.1

    // Retrieve and validate the values for Rind.2, Rind.3, and Rind.6 COL1
    var col1Row2 = Number(values['CAP1_R2_C1']);
    var col1Row3 = Number(values['CAP1_R3_C1']);
    var col1Row6 = Number(values['CAP1_R6_C1']);

    col1Row2 = isNaN(col1Row2) ? 0 : col1Row2;
    col1Row3 = isNaN(col1Row3) ? 0 : col1Row3;
    col1Row6 = isNaN(col1Row6) ? 0 : col1Row6;

    // Calculate the sum of Rind.2, Rind.3, and Rind.6 COL1
    var totalSum = col1Row2 + col1Row3 + col1Row6;

    // Validate that Rind.1 COL1 is greater than or equal to the sum
    if (col1Row1 < totalSum) {
        // Push an error to the webform errors array
        webform.errors.push({
            fieldName: 'CAP1_R1_C1',
            weight: 1,
            msg: concatMessage(
                '30-001',
                'Rind.1 COL1',
                Drupal.t(`Cod eroare: 30-001. Valoarea din Rind.1 COL1 (${col1Row1}) trebuie să fie mai mare sau egală cu suma valorilor din Rind.2 (${col1Row2}), Rind.3 (${col1Row3}), și Rind.6 (${col1Row6}) COL1 (${totalSum}).`)
            )
        });
    }
}


function sort_errors_warinings(a, b) {
    if (!a.hasOwnProperty('weight')) {
        a.error_code = 9999;
    }

    if (!b.hasOwnProperty('weight')) {
        b.error_code = 9999;
    }

    return toFloat(a.error_code) - toFloat(b.error_code);
}