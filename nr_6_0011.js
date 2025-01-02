(function ($) {

    var activity_options_default_value = '';


    Drupal.behaviors.NR6 = {
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

webform.validators.NR6 = function (v, allowOverpass) {
    var values = Drupal.settings.mywebform.values;




    // Start 29-001
    if (!isNaN(Number((values.CAP1_R1_C1)))) {
    var R1_C1 = Number(values.CAP1_R1_C1);}

    if (!isNaN(Number(values.CAP1_R2_C1))) {
    var R2_C1 = Number(values.CAP1_R2_C1);}


    if ((R1_C1 < R2_C1)) {
        webform.errors.push({
            'fieldName': 'CAP1_R1_C1',
            'weight': 1,
            'msg': Drupal.t('Cod eroare: 29-001 Rind.1 COL1 >= Rind(2+3+6) COL1  ( @R1_C1 < @R2_C1)', { '@R1_C1': R1_C1, '@R2_C1': R2_C1 })
        });
    }
    // End  29-001

 

    // Start 29-003

    if (!isNaN(Number((values.CAP1_R7_C1)))) {
    var R7_C1 = Number(values.CAP1_R7_C1);} 


    if (!isNaN(Number((values.CAP1_R8_C1)))) {
    var R8_C1 = Number(values.CAP1_R8_C1);}


    if ((R7_C1 < R8_C1)) {
        webform.errors.push({
            'fieldName': 'CAP1_R7_C1',
            'weight': 2,
            'msg': Drupal.t('Cod eroare: 29-002 Rind.7 COL1 >= Rind(8+9) COL1  ( @R7_C1 < @R8_C1)', { '@R7_C1': R7_C1, '@R8_C1': R8_C1 })
        });
    }
    // End  29-003


    // Start 29-004

    if (!isNaN(Number((values.CAP1_R10_C1)))) {
    var R10_C1 = Number(values.CAP1_R10_C1);}

    if (!isNaN(Number((values.CAP1_R11_C1)))) {
    var R11_C1 = Number(values.CAP1_R11_C1);}
   

    if ((R10_C1 < R11_C1)) {
        webform.errors.push({
            'fieldName': 'CAP1_R10_C1',
            'weight': 3,
            'msg': Drupal.t('Cod eroare: 29-004 Rind.10 COL1 >= Rind.11 COL1 ( @R10_C1 < @R11_C1)', { '@R10_C1': R10_C1, '@R11_C1': R11_C1 })
        });
    }
    // End  29-004




    // Start 29-006

    if (!isNaN(Number((values.CAP1_R13_C1)))) {
    var R13_C1 = Number(values.CAP1_R13_C1);}

    if (!isNaN(Number((values.CAP1_R14_C1)))) {
    var R14_C1 = Number(values.CAP1_R14_C1);}


    if ((R13_C1 < R14_C1)) {
        webform.errors.push({
            'fieldName': 'CAP1_R13_C1',
            'weight': 4,
            'msg': Drupal.t('Cod eroare: 29-006 Rind.13 COL1 >= Rind.14 COL1 ( @R13_C1 < @R14_C1)', { '@R13_C1': R13_C1, '@R14_C1': R14_C1 })
        });
    }
    // End  29-006





    //Sort warnings & errors
    webform.warnings.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.errors.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.validatorsStatus['NR6'] = 1;
    validateWebform();

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