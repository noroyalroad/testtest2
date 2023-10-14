import axios from "axios";

export const signInApi = async(data: any) => {

    console.log(data);
    const response = await axios.post("/api/auth/signIn", data).catch((error)=> null);
    if (!response) return null;

    const result = response.data;
    return result;
}

export const signUpApi = async (data: any) => {

    console.log(data);
    const response = await axios.post("/api/auth/signUp", data).catch((error)=> null);

    if (!response) return null;

    const result = response.data.result;

    return result;

}


export const NextClickApi = async (data: any) => {

    console.log(data);
    const response = await axios.post('/api/auth/nextClick', data).catch((error)=> null);
    if (!response) return null;
    const result = response.data;
    return result;
}


export const GetUserInfo = async (data: any) => {
    try {
        const response = await axios.get('/api/users/mypage', {
            headers: {
                'Authorization': `Bearer ${data}`
            }
        });
        console.log(response.data.data); // 서버 응답 데이터 확인
        return response.data.data;
    } catch (error) {
        console.error(error); // 오류를 콘솔에 출력
        return null; // 오류 발생 시 null 반환
    }
}