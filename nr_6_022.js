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
    validateRow3Col1();
    validateRow7Col1();
    validateRow10Col1();
    validateRowsCol1();
    validateComplexRowsCol1();
    validateRowACol1();
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
//------------------------------------------------------------------

function validateRowACol1() {
    // Get the values object from Drupal settings
    var values = Drupal.settings.mywebform.values;

    // Validation for 30-012: Rind.A COL1 >= Rind.B COL1
    var col1RowA = Number(values['CAP1_RA_C1']); // Replace with the actual key for Rind.A COL1
    var col1RowB = Number(values['CAP1_RB_C1']); // Replace with the actual key for Rind.B COL1

    // Ensure values are numbers, default to 0 if invalid
    col1RowA = isNaN(col1RowA) ? 0 : col1RowA;
    col1RowB = isNaN(col1RowB) ? 0 : col1RowB;

    // Perform the validation check
    if (col1RowA < col1RowB) {
        webform.errors.push({
            fieldName: 'CAP1_RA_C1', // Replace with the actual key for Rind.A COL1
            weight: 1,
            msg: `Cod eroare: 30-012, Rind.A COL1 >= Rind.B COL1. Valoarea din Rind.A COL1 (${col1RowA}) trebuie să fie mai mare sau egală cu valoarea din Rind.B COL1 (${col1RowB}).`
        });
    }
}

//--------------------------------------------------------------


function validateComplexRowsCol1() {
    // Get the values object from Drupal settings
    var values = Drupal.settings.mywebform.values;

    // Validation for 30-010: Rind.20 COL1 >= Rind(21+22+23+24) COL1
    var col1Row20 = Number(values['CAP1_R20_C1']);
    col1Row20 = isNaN(col1Row20) ? 0 : col1Row20; // Ensure no NaN

    var col1Row21 = Number(values['CAP1_R21_C1']);
    var col1Row22 = Number(values['CAP1_R22_C1']);
    var col1Row23 = Number(values['CAP1_R23_C1']);
    var col1Row24 = Number(values['CAP1_R24_C1']);

    col1Row21 = isNaN(col1Row21) ? 0 : col1Row21;
    col1Row22 = isNaN(col1Row22) ? 0 : col1Row22;
    col1Row23 = isNaN(col1Row23) ? 0 : col1Row23;
    col1Row24 = isNaN(col1Row24) ? 0 : col1Row24;

    var sum21to24 = col1Row21 + col1Row22 + col1Row23 + col1Row24;

    if (col1Row20 < sum21to24) {
        webform.errors.push({
            fieldName: 'CAP1_R20_C1',
            weight: 1,
            msg: `Cod eroare: 30-010, Rind.20 COL1 >= Rind(21+22+23+24) COL1. Valoarea din Rind.20 COL1 (${col1Row20}) trebuie să fie mai mare sau egală cu suma valorilor din Rind(21+22+23+24) COL1 (${sum21to24}).`
        });
    }

    // Validation for 30-011: Rind.25 COL1 >= Rind(26+27+28) COL1
    var col1Row25 = Number(values['CAP1_R25_C1']);
    col1Row25 = isNaN(col1Row25) ? 0 : col1Row25; // Ensure no NaN

    var col1Row26 = Number(values['CAP1_R26_C1']);
    var col1Row27 = Number(values['CAP1_R27_C1']);
    var col1Row28 = Number(values['CAP1_R28_C1']);

    col1Row26 = isNaN(col1Row26) ? 0 : col1Row26;
    col1Row27 = isNaN(col1Row27) ? 0 : col1Row27;
    col1Row28 = isNaN(col1Row28) ? 0 : col1Row28;

    var sum26to28 = col1Row26 + col1Row27 + col1Row28;

    if (col1Row25 < sum26to28) {
        webform.errors.push({
            fieldName: 'CAP1_R25_C1',
            weight: 1,
            msg: `Cod eroare: 30-011, Rind.25 COL1 >= Rind(26+27+28) COL1. Valoarea din Rind.25 COL1 (${col1Row25}) trebuie să fie mai mare sau egală cu suma valorilor din Rind(26+27+28) COL1 (${sum26to28}).`
        });
    }
}

//---------------------------------------------------------

function validateRowsCol1() {
    // Get the values object from Drupal settings
    var values = Drupal.settings.mywebform.values;

    // Define the validation rules as an array of objects
    var rules = [
        { errorCode: '30-006', fieldName: 'Rind.13 COL1', compareTo: 'Rind.14 COL1', fieldKey: 'CAP1_R13_C1', compareKey: 'CAP1_R14_C1' },
        { errorCode: '30-007', fieldName: 'Rind.15 COL1', compareTo: 'Rind.16 COL1', fieldKey: 'CAP1_R15_C1', compareKey: 'CAP1_R16_C1' },
        { errorCode: '30-008', fieldName: 'Rind.16 COL1', compareTo: 'Rind.17 COL1', fieldKey: 'CAP1_R16_C1', compareKey: 'CAP1_R17_C1' },
        { errorCode: '30-009', fieldName: 'Rind.18 COL1', compareTo: 'Rind.19 COL1', fieldKey: 'CAP1_R18_C1', compareKey: 'CAP1_R19_C1' }
    ];

    // Iterate through the rules and validate each condition
    rules.forEach(rule => {
        var fieldValue = Number(values[rule.fieldKey]);
        var compareValue = Number(values[rule.compareKey]);

        // Ensure values are numbers, default to 0 if invalid
        fieldValue = isNaN(fieldValue) ? 0 : fieldValue;
        compareValue = isNaN(compareValue) ? 0 : compareValue;

        // Perform the validation check
        if (fieldValue < compareValue) {
            webform.errors.push({
                fieldName: rule.fieldKey,
                weight: 1,
                msg: concatMessage(
                  
                    '',
                  
                    '',
                    Drupal.t(`Cod eroare: ${rule.errorCode}, ${rule.fieldName} >= ${rule.compareTo}. Valoarea din ${rule.fieldName} trebuie să fie mai mare sau egală cu ${rule.compareTo}. (${fieldValue} < ${compareValue}).`)
                )
            });
        }
    });
}

//--------------------------------------------------


function validateRow10Col1() {
    // Get the values object from Drupal settings
    var values = Drupal.settings.mywebform.values;

    // Retrieve and validate the value for Rind.10 COL1
    var col1Row10 = Number(values['CAP1_R10_C1']);
    col1Row10 = isNaN(col1Row10) ? 0 : col1Row10; // Ensure no NaN for COL1 Rind.10

    // Retrieve and validate the values for Rind.11 and Rind.12 COL1
    var col1Row11 = Number(values['CAP1_R11_C1']);
    var col1Row12 = Number(values['CAP1_R12_C1']);

    col1Row11 = isNaN(col1Row11) ? 0 : col1Row11;
    col1Row12 = isNaN(col1Row12) ? 0 : col1Row12;

    // Validation for 30-004: Rind.10 COL1 >= Rind.11 COL1
    if (col1Row10 < col1Row11) {
        webform.errors.push({
            fieldName: 'CAP1_R10_C1',
            weight: 1,
            msg: concatMessage(
                '30-004',
                'Rind.10 COL1',
                Drupal.t(`Cod eroare: 30-004. Valoarea din Rind.10 COL1 (${col1Row10}) trebuie să fie mai mare sau egală cu valoarea din Rind.11 COL1 (${col1Row11}).`)
            )
        });
    }

    // Validation for 30-005: Rind.10 COL1 >= Rind.12 COL1
    if (col1Row10 < col1Row12) {
        webform.errors.push({
            fieldName: 'CAP1_R10_C1',
            weight: 1,
            msg: concatMessage(
                '30-005',
                'Rind.10 COL1',
                Drupal.t(`Cod eroare: 30-005. Valoarea din Rind.10 COL1 (${col1Row10}) trebuie să fie mai mare sau egală cu valoarea din Rind.12 COL1 (${col1Row12}).`)
            )
        });
    }
}

//----------------------------------------------

function validateRow7Col1() {
    // Get the values object from Drupal settings
    var values = Drupal.settings.mywebform.values;

    // Retrieve and validate the value for Rind.7 COL1
    var col1Row7 = Number(values['CAP1_R7_C1']);
    col1Row7 = isNaN(col1Row7) ? 0 : col1Row7; // Ensure no NaN for COL1 Rind.7

    // Retrieve and validate the values for Rind.8 and Rind.9 COL1
    var col1Row8 = Number(values['CAP1_R8_C1']);
    var col1Row9 = Number(values['CAP1_R9_C1']);

    col1Row8 = isNaN(col1Row8) ? 0 : col1Row8;
    col1Row9 = isNaN(col1Row9) ? 0 : col1Row9;

    // Calculate the sum of Rind.8 and Rind.9 COL1
    var totalSum = col1Row8 + col1Row9;

    // Validate that Rind.7 COL1 is greater than or equal to the sum
    if (col1Row7 < totalSum) {
        // Push an error to the webform errors array
        webform.errors.push({
            fieldName: 'CAP1_R7_C1',
            weight: 1,
            msg: concatMessage(
                '30-003',
                'Rind.7 COL1',
                Drupal.t(`Cod eroare: 30-003. Valoarea din Rind.7 COL1 (${col1Row7}) trebuie să fie mai mare sau egală cu suma valorilor din Rind.8 (${col1Row8}) și Rind.9 (${col1Row9}) COL1 (${totalSum}).`)
            )
        });
    }
}


//---------------------------------

function validateRow3Col1() {
    // Get the values object from Drupal settings
    var values = Drupal.settings.mywebform.values;

    // Retrieve and validate the value for Rind.3 COL1
    var col1Row3 = Number(values['CAP1_R3_C1']);
    col1Row3 = isNaN(col1Row3) ? 0 : col1Row3; // Ensure no NaN for COL1 Rind.3

    // Retrieve and validate the values for Rind.4 and Rind.5 COL1
    var col1Row4 = Number(values['CAP1_R4_C1']);
    var col1Row5 = Number(values['CAP1_R5_C1']);

    col1Row4 = isNaN(col1Row4) ? 0 : col1Row4;
    col1Row5 = isNaN(col1Row5) ? 0 : col1Row5;

    // Calculate the sum of Rind.4 and Rind.5 COL1
    var totalSum = col1Row4 + col1Row5;

    // Validate that Rind.3 COL1 is greater than or equal to the sum
    if (col1Row3 < totalSum) {
        // Push an error to the webform errors array
        webform.errors.push({
            fieldName: 'CAP1_R3_C1',
            weight: 1,
            msg: concatMessage(
                '30-002',
                'Rind.3 COL1',
                Drupal.t(`Cod eroare: 30-002. Valoarea din Rind.3 COL1 (${col1Row3}) trebuie să fie mai mare sau egală cu suma valorilor din Rind.4 (${col1Row4}) și Rind.5 (${col1Row5}) COL1 (${totalSum}).`)
            )
        });
    }
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