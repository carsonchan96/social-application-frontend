export const Alert = (props) => {
    if(props.show == true){
        return(
            <div className="text-red">
                credentials invalid
            </div>
        );
    }
}