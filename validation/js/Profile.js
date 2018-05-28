'use strict';

const profileStyle = {
    border: '1px solid #cccccc',
    borderRadius: '5px',
    width: '100%',
    height: '100%',
    margin: '5px'
};

const imageStyle = {
    width: '200px',
    height: '200px'
};

const Profile = props => {
    return (
        <div className="col-md-4 text-center" style={{marginBottom: '10px'}}>
            <div style={profileStyle}>
                <h2>{props.first_name} {props.last_name}</h2>
                <div>
                    <img src={props.img} className="img-thumbnail" style={imageStyle}/>
                </div>
                <p>vk: <a href={props.url}>{props.url}</a></p>
                <p>birthday: <a href={props.birthday}>{props.birthday}</a></p>
            </div>
        </div>
    );
};

Profile.propTypes = {
    img: PropTypes.string.isRequired,
    url: (props, propName, componentName) => {
        let linkUrl = props[propName];
        let isLinkUrl = (typeof linkUrl === 'string') &&
            /https:\/\/vk.com\/(id[0-9]+|[A-Za-z0-9_-]+)/;
        if(!isLinkUrl) {
            return new Error(`Неверный параметр ${propName} в компоненте
${componentName}: параметр должен быть ссылкой на профиль вконтакте`);
        }
        return null;
    },
    birthday: (props, propName, componentName) =>{
        let birthdayDateProp = props[propName];
        if(birthdayDateProp) {
            let isDate = (typeof  birthdayDateProp === 'string') &&
                /^[\d]{4}\-[\d]{2}\-[\d]{2}$/;

            if (!isDate) {
                console.log('birthdayDateProp', birthdayDateProp)
                return new Error(`Неверный параметр ${propName} в компоненте
${componentName}: параметр должен быть датой вида 1994-12-30`);
            }
            else {
                let birthdayData = new Date(...birthdayDateProp.split('-')).getTime();
                let now = new Date().getTime();
                if (now - birthdayData < 0) {
                    return new Error(`Неверный параметр ${propName} в компоненте
${componentName}: параметр должен быть датой не позже сегодншнего дня`);
                }
            }
        }
        return null;
    }
}

Profile.defaultProps = {
    img: './images/profile.jpg'
}
