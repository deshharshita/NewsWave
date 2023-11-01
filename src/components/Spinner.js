import loading from "./loadingspinner.gif";

const Spinner = ()=>{
        return(
            <div className="text-center my-3">
                <img src={loading} alt="loading"></img>
            </div>
        )
    
}

export default Spinner;