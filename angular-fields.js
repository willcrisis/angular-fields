(function () {
    'use strict';
    angular.module('willcrisis.angular-fields', ['ngMessages'])
        .component('labeledInput', {
            require: {
                form: '^form'
            },
            template: `
            <div class="form-group" ng-class="{'has-error': $ctrl.form[$ctrl.name].$touched || $ctrl.form[$ctrl.name].$dirty && $ctrl.form[$ctrl.name].$invalid}">
                <label class="control-label">{{$ctrl.label}}</label> <span class="required" ng-if="$ctrl.ngRequired">*</span>
                <input class="form-control" type="{{$ctrl.type}}" name="{{$ctrl.name}}" ng-model="$ctrl.ngModel"
                    ng-required="$ctrl.ngRequired" ng-readonly="$ctrl.ngReadonly" ng-disabled="$ctrl.ngDisabled" ng-maxlength="$ctrl.ngMaxlength" maxlength="{{$ctrl.ngMaxlength}}" ng-minlength="$ctrl.ngMinlength">
                <div ng-messages="$ctrl.form[$ctrl.name].$error" class="error" role="alert" ng-if="$ctrl.form[$ctrl.name].$touched || $ctrl.form[$ctrl.name].$dirty">
                    <label class="control-label" ng-message="required">O campo {{$ctrl.label}} é obrigatório.</label>
                    <label class="control-label" ng-message="email">O campo {{$ctrl.label}} deve ser um e-mail válido.</label>
                    <label class="control-label" ng-message="maxlength">O campo {{$ctrl.label}} deve ter no máximo {{$ctrl.ngMaxlength}} caracteres.</label>
                    <label class="control-label" ng-message="minlength">O campo {{$ctrl.label}} deve ter no mínimo {{$ctrl.ngMinlength}} caracteres.</label>
                </div>
            </div>
            `,
            controller: function () {
                this.type = this.type || 'text';
            },
            link: function (scope, element) {
                scope.watch('ngMaxlength', function (newVal) {
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
                ngMaxlength: '=?',
                ngMinlength: '=?'
            }
        });
})();