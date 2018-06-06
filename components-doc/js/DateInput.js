'use strict';

const DateInput = props => {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <input type="text" className="form-control" name={props.name} onChange={props.onChange}
                   value={props.value} required={props.required} placeholder="YYYY-MM-DD"/>
        </div>
    )
};

const datePropType = (props, propName, componentName) => {
    let date = props[propName];
    let isDate = (typeof  date === 'string') &&
        /^\d{4}\-\d{2}\-\d{2}$/.test(date);

    if(!isDate) {
        return new Error(`Неверный параметр ${propName} в компоненте
${componentName}: параметр должен быть датой вида 1994-12-30`);
    }
    return null;
}

DateInput.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: datePropType
};
const today = new Date();
DateInput.defaultProps = {
    value: today.getFullYear()+'-'+today.getMonth()+1+'-'+today.getDate()
};
