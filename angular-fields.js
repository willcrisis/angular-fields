(function () {
    'use strict';
    angular.module('willcrisis.angular-fields', ['ngMessages'])
        .component('labeledInput', {
            require: {
                form: '^form'
            },
            template: `
            <div class="form-group" ng-class="{'has-error': !$ctrl.form[$ctrl.name].$pristine && !$ctrl.form[$ctrl.name].$valid}">
                <label class="control-label">{{$ctrl.label}}</label>
                <input class="form-control" type="{{$ctrl.type}}" name="{{$ctrl.name}}" ng-model="$ctrl.ngModel"
                    ng-required="$ctrl.ngRequired" ng-readonly="$ctrl.ngReadonly" ng-disabled="$ctrl.ngDisabled" ng-maxlength="$ctrl.ngMaxlength" maxlength="{{$ctrl.ngMaxlength}}">
                <div ng-messages="$ctrl.form[$ctrl.name].$error" class="error" role="alert" ng-if="$ctrl.form[$ctrl.name].$dirty">
                    <div ng-message="required">O campo {{$ctrl.label}} é obrigatório.</div>
                    <div ng-message="email">O campo {{$ctrl.label}} deve ser um e-mail válido.</div>
                    <div ng-message="maxlength">O campo {{$ctrl.label}} deve ter no máximo {{$ctrl.ngMaxlength}} caracteres.</div>
                </div>
            </div>
            `,
            controller: function () {
                this.type = this.type || 'text';
            },
            link: function(scope, element) {
                scope.watch('ngMaxlength', function(newVal) {
                    element.find('input').attr('maxlength', newVal);
                });
            },
            bindings: {
                label: '@',
                name: '@',
                type: '@',
                ngModel: '=',
                ngRequired: '=?',
                ngReadonly: '=?',
                ngDisabled: '=?',
                ngMaxlength: '=?'
            }
        });
})();