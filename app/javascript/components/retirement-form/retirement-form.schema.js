import { componentTypes, validatorTypes } from '@@ddf';

const createSchema = (showDateError) => ({
  fields: [{
    component: componentTypes.SUB_FORM,
    name: 'retirement-date-subform',
    title: __('Set/Remove Retirement Date'),
    fields: [{
      component: 'select',
      id: 'formMode',
      name: 'formMode',
      label: __('Enter Retirement Date as'),
      initialValue: 'date',
      isRequired: true,
      validate: [{ type: validatorTypes.REQUIRED }],
      options: [
        { label: __('Specific Date and Time'), value: 'date' },
        { label: __('Time Delay from Now'), value: 'delay' }],
    }, {
      component: componentTypes.SUB_FORM,
      name: 'retirement-delay-subform',
      description: __('Time Delay'),
      condition: {
        when: 'formMode',
        is: 'delay',
      },
      fields: [{
        component: 'text-field',
        type: 'number',
        label: __('Months'),
        name: 'months',
        initialValue: 0,
        min: 0,
      }, {
        component: 'text-field',
        type: 'number',
        label: __('Weeks'),
        name: 'weeks',
        initialValue: 0,
        min: 0,
      }, {
        component: 'text-field',
        type: 'number',
        label: __('Days'),
        name: 'days',
        initialValue: 0,
        min: 0,
      }, {
        component: 'text-field',
        type: 'number',
        label: __('Hours'),
        name: 'hours',
        initialValue: 0,
        min: 0,
      },
      ],
    }, {
      component: componentTypes.DATE_PICKER,
      id: 'retirementDate',
      name: 'retirementDate',
      variant: 'date-time',
      label: __('Retirement Date'),
      isRequired: true,
      condition: {
        or: [{ when: 'formMode', is: 'date' }, { when: 'formMode', is: '' }],
      },
    }, {
      component: componentTypes.TIME_PICKER,
      label: __('Retirement Time'),
      name: 'retirementTime',
      key: 'test',
      twelveHoursFormat: true,
      condition: {
        or: [{ when: 'formMode', is: 'date' }, { when: 'formMode', is: '' }],
      },
    }, {
      component: 'select',
      id: 'retirementWarning',
      name: 'retirementWarning',
      label: __('Retirement Warning'),
      options: [
        { label: __('None'), value: '' },
        { label: __('1 Week before retirement'), value: 7 },
        { label: __('2 Weeks before retirement'), value: 14 },
        { label: __('30 Days before retirement'), value: 30 },
      ],
    },
    ...(showDateError ? [
      {
        id: 'dateWarning',
        component: componentTypes.PLAIN_TEXT,
        name: 'dateWarning',
        label: __('Please select a date.'),
        condition: {
          or: [{ when: 'formMode', is: 'date' }, { when: 'formMode', is: '' }],
        },
      },
    ] : []),
    ],
  },
  ],
});

export default createSchema;
