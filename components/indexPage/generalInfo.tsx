import { useRecoilState } from "recoil";
import { allStoreInfoState } from "../../atoms/allStoreInfo";

const GeneralInfo = () => {

    const [ allStore ] = useRecoilState<any>(allStoreInfoState);

    return(
        <>
        <h2>General Info</h2>

        <div style={{display:"flex" , justifyContent:'space-around'}}>
          <div style={{ textAlign:"center" }}>
              <h1 style={{ margin:"0", fontSize:"4rem" }}>{allStore.data.allStoreData.wait || "N/A"}</h1>
              <h3 style={{ margin:"0" }}>Minutes</h3>
          </div>
          <div style={{ textAlign:"center" }}>
              <h1 style={{margin:"0", fontSize:"4rem"}}>{allStore.data.allStoreData.waitingGroup || "N/A"}</h1>
              <h3 style={{margin:"0"}}>Queue</h3>
          </div>
        </div>
        </>
    )

}

export default GeneralInfo
