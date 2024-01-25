import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Redirection() {
  //최초 렌더링 시 발동
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    
    //spring 서버로 인증키를 통해 유저정보를 획득하고 로그인 처리 요청
    axios.post('/api/client/login/oauth/kakao', {
      authorizationCode: code
    }).then((response) => {
      
        //spring에서 발급된 jwt localStorage 저장
        localStorage.setItem("accessToken", response.headers.accesstoken);
      
        //메인 페이지로 이동
        window.location.href = "/";
      }).catch((err) => {
        //에러발생 시 경고처리 후 login 페이지로 전환
        alert(err.response.data.detail);
      
        window.location.href = "/login";
      })
  }, []);

  return (
    <div>
      <Loading />
    </div>
  )
}

export default Redirection;