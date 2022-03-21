import "./styles.scss"

const AuthWrapper = ({ headline, children }) => {
    return (
        <div className="authWrapper">
            {headline &&
                <div className="pageTop">
                    <h1>{headline}</h1>
                </div>
            }
            {children}
        </div>
    )
}

export default AuthWrapper;