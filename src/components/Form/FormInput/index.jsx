import "./styles.scss";

const FormInput = ({ label, handleChange, ...otherProps }) => {
    return (
        <div className="formRow">
            {label &&
                <label>{label}</label>
            }
            <input className="formInput" onChange={handleChange} {...otherProps} />
        </div>
    )
}

export default FormInput