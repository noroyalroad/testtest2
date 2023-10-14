import React, { useEffect, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Box, Button, Card, TextField, Typography, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, InputAdornment } from "@mui/material";
import { NextClickApi, signUpApi } from "../../../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp(props) {
  // 회원가입 폼 입력값과 오류 상태 변수
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [preference_1, setPreference_1] = useState("0");
  const [preference_2, setPreference_2] = useState("0");
  const [preference_3, setPreference_3] = useState("0");
  const [showPosterDialog, setShowPosterDialog] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNickNameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [ageError, setAgeError] = useState(""); // 연령대 에러 상태 변수 추가
  const [posterError, setPosterError] = useState("");
  const [preference1Error, setPreference1Error] = useState("");
  const [preference2Error, setPreference2Error] = useState("");
  const [preference3Error, setPreference3Error] = useState("");

  // 회원가입 단계를 추적하기 위한 상태 변수
  const [currentStep, setCurrentStep] = useState(1);

  const { setAuthView } = props;

  const navigate = useNavigate();

  const handleLoginClick = () => {
    // 로그인 버튼 클릭 시 다른 페이지로 이동
    navigate("/boardmain/SignIn");
  };

  useEffect(() => {
    setGender("0");
    setSelectedAge("0");
  }, []);

  const moviePosters = [
    { id: "299534", url: "https://image.tmdb.org/t/p/w500/z7ilT5rNN9kDo8JZmgyhM6ej2xv.jpg" },
    { id: "767", url: "https://image.tmdb.org/t/p/w500/yrGlb3HLtjGp39mv4MJ5UuIHcj4.jpg" },
    { id: "8392", url: "https://image.tmdb.org/t/p/w500/csiklRMzvXRLKtFcIlEDeEU7nWr.jpg" },
    { id: "924", url: "https://image.tmdb.org/t/p/w500/qqTYdTvdhsWr6vZ72WROS7u7V9r.jpg" },
    { id: "954", url: "https://image.tmdb.org/t/p/w500/j4Ix3N5GrTrnQVDrA3ss1vwVvtf.jpg" },
    { id: "4415", url: "https://image.tmdb.org/t/p/w500/3TOgmlIY8X3WjIjvU7Z0jqeNkyU.jpg" },
    { id: "23827", url: "https://image.tmdb.org/t/p/w500/uNOEIKO1YW2XP9mjSdZ8oaHaRFm.jpg" },
    { id: "49797", url: "https://image.tmdb.org/t/p/w500/dFGrIdZGJtxm1GG4X1liYbxyjgd.jpg" },
    { id: "198277", url: "https://image.tmdb.org/t/p/w500/xVXC1mDkjJ1pK9tTFgO2DGPavJj.jpg" },
    { id: "857", url: "https://image.tmdb.org/t/p/w500/2ATMbU4EljWkWcEJT9TElbQOMYY.jpg" },
    { id: "12", url: "https://image.tmdb.org/t/p/w500/9ViCYfZ0whpwtKbM2WJP5PfsG2x.jpg" },
    { id: "862", url: "https://image.tmdb.org/t/p/w500/5ELwzkC7QY9vug20AvRFOXBzLbG.jpg" },
    // 이하 포스터 정보 추가
  ];

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [selectedPreferences, setSelectedPreferences] = useState(["0", "0", "0"]);

  const handlePreferenceSelect = (preference, index) => {
    const updatedSelectedPreferences = [...selectedPreferences];
    updatedSelectedPreferences[index] = preference;
    setSelectedPreferences(updatedSelectedPreferences);
  };

  // 회원가입 두번째 단계로 이동
  const handleNextClick = async () => {
    // 이메일, 비밀번호, 이름, 닉네임 유효성 검사
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nicknameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,8}$/;
    const nameRegex = /^[ㄱ-ㅎ|가-힣].{1,4}$/;

    const data = {
      email,
      password,
      passwordCheck,
      name,
      nickname,
      gender,
      age: selectedAge,
      movieId: selectedMovie,
      preference_1,
      preference_2,
      preference_3,
    };

    const nextClickResponse = await NextClickApi(data);
    console.log(nextClickResponse);

    // 이메일 유효성 검사
    if (!email) {
      setEmailError("이메일 주소를 입력해주세요.");
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError("유효한 이메일 형식을 입력해주세요.");
      return;
    } else if (nextClickResponse.message === "Email already in use") {
      setEmailError("중복된 이메일입니다.");
      return;
    } else {
      setEmailError("");
    }

    // 비밀번호 유효성 검사
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      return;
    } else if (!passwordRegex.test(password)) {
      setPasswordError("비밀번호는 최소 8자 이상, 영문자와 숫자, 특수 문자를 포함해야 합니다.");
      return;
    } else {
      setPasswordError("");
    }

    // 비밀번호 일치 여부 검사
    if (password !== passwordCheck) {
      setPasswordMatchError("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      setPasswordMatchError("");
    }

    // 이름 유효성 검사
    if (!name) {
      setNameError("이름을 입력해주세요.");
      return;
    } else if (!nameRegex.test(name) || name.length < 1 || name.length >= 5) {
      setNameError("1글자 이상 5글자 미만 한글만 입력 가능합니다.");
      return;
    } else {
      setNameError("");
    }

    // 닉네임 유효성 검사
    if (!nickname) {
      setNickNameError("닉네임을 입력해주세요.");
      return;
    } else if (!nicknameRegex.test(nickname)) {
      setNickNameError("한글로 1글자 이상 9글자 미만으로 입력해주세요.");
      return;
    } else if (nextClickResponse.message === "Nickname already in use") {
      setNickNameError("중복된 닉네임입니다.");
      return;
    } else {
      setNickNameError("");
    }

    if (gender === "0") {
      setGenderError("성별을 선택해주세요."); // Set the error message
      return;
    } else {
      setGenderError(""); // Clear the error message if gender is selected
    }

    if (selectedAge === "0") {
      setAgeError("연령대를 선택해주세요."); // Set the error message
      return;
    } else {
      setAgeError(""); // Clear the error message if age is selected
    }

    // 모든 필수 정보가 올바르게 입력되었을 때 다음 단계로 이동
    if (currentStep === 1 && !emailError && !passwordError && !passwordMatchError && !nameError && !nicknameError && !genderError && !ageError) {
      setCurrentStep(2);
    }
  };

  const signUpHandler = async () => {
    // API 호출을 위한 데이터 준비
    const data = {
      email,
      password,
      passwordCheck,
      name,
      nickname,
      gender,
      age: selectedAge,
      movieId: selectedMovie,
      preference_1,
      preference_2,
      preference_3,
    };

    if (!selectedMovie) {
      setPosterError("영화를 선택하세요.");
      return;
    } else {
      setPosterError("");
    }

    if (preference_1 === "0") {
      setPreference1Error("영화를 볼 때 우선적으로 생각하는 것 1순위를 선택하세요.");
      return;
    } else {
      setPreference1Error(""); // 선택이 유효한 경우 에러 메시지 초기화
    }

    // 2순위 장르 선택
    if (preference_2 === "0") {
      setPreference2Error("영화를 볼 때 우선적으로 생각하는 것 2순위를 선택하세요.");
      return;
    } else {
      setPreference2Error(""); // 선택이 유효한 경우 에러 메시지 초기화
    }

    // 3순위 장르 선택
    if (preference_3 === "0") {
      setPreference3Error("영화를 볼 때 우선적으로 생각하는 것 3순위를 선택하세요.");
      return;
    } else {
      setPreference3Error(""); // 선택이 유효한 경우 에러 메시지 초기화
    }

    // 회원가입 API 호출
    const signUpResponse = await signUpApi(data);

    console.log(signUpResponse);

    if (signUpResponse === false) {
      return;
    } else {
      alert("회원가입에 성공했습니다.");
      axios.post("http://52.79.68.204:5001/userjoin", { user_email: email }).then((res) => {
        console.log(res);
      });
      navigate("/");
    }
  };

  const handlePrevClick = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const openPosterDialog = () => {
    setShowPosterDialog(true);
  };

  const handlePosterClick = (posterId) => {
    setSelectedMovie(posterId);
    closePosterDialog();
  };

  const isMovieSelected = selectedMovie !== "";

  const closePosterDialog = () => {
    setShowPosterDialog(false);
  };

  const [isPosterVisible, setIsPosterVisible] = useState(false);

  const handlePosterClose = () => {
    setShowPosterDialog(false); // 다이얼로그만 닫음
  };

  const handleTogglePoster = (movieId) => {
    setSelectedMovie(movieId);
    setIsPosterVisible(true);
    setIsModalOpen(true);
  };

  const selectedMovieId = moviePosters;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh" // 화면의 높이를 100vh로 설정하여 화면 중앙에 위치시킴
    >
      <Card sx={{ width: 500, maxWidth: 500, height: "800px", maxHeight: "800px", padding: 5 }}>
        <Box>
          <Typography variant="h5" sx={{ mb: 4 }}>
            회원가입
          </Typography>
        </Box>
        <Box height={"50vh"}>
          {currentStep === 1 && (
            <div>
              <Typography variant="subtitle1" fontSize="small"></Typography>
              <TextField fullWidth label="이메일주소" type="email" variant="standard" onChange={(e) => setEmail(e.target.value)} placeholder="yourEmail@email.com" value={email} sx={{ mb: 2 }} />
              {emailError && (
                <Typography color="error" fontSize="small">
                  {emailError}
                </Typography>
              )}
              <TextField
                fullWidth
                label="비밀번호"
                type={showPassword ? "text" : "password"}
                variant="standard"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {passwordError && (
                <Typography color="error" fontSize="small">
                  {passwordError}
                </Typography>
              )}
              <TextField
                fullWidth
                label="비밀번호 확인"
                type={showPassword ? "text" : "password"}
                variant="standard"
                onChange={(e) => setPasswordCheck(e.target.value)}
                value={passwordCheck}
                sx={{ mb: 2 }}
              />
              {passwordMatchError && (
                <Typography color="error" fontSize="small">
                  {passwordMatchError}
                </Typography>
              )}
              <TextField fullWidth label="이름" variant="standard" onChange={(e) => setName(e.target.value)} value={name} sx={{ mb: 2 }} />
              {nameError && (
                <Typography color="error" fontSize="small">
                  {nameError}
                </Typography>
              )}
              <TextField fullWidth label="닉네임" variant="standard" onChange={(e) => setNickName(e.target.value)} value={nickname} sx={{ mb: 2 }} />
              {nicknameError && (
                <Typography color="error" fontSize="small">
                  {nicknameError}
                </Typography>
              )}
              <Typography variant="subtitle1" fontSize="small">
                성별
              </Typography>
              <Select
                fullWidth
                variant="standard"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setGenderError(""); // 선택할 때 에러 메시지 초기화
                }}
                sx={{ mb: 2 }}
              >
                <MenuItem value="0">선택</MenuItem>
                <MenuItem value="1">남자</MenuItem>
                <MenuItem value="2">여자</MenuItem>
              </Select>
              {genderError && (
                <Typography color="error" fontSize="small">
                  {genderError}
                </Typography>
              )}

              <Typography variant="subtitle1" fontSize="small">
                연령대
              </Typography>
              <Select
                fullWidth
                variant="standard"
                value={selectedAge}
                onChange={(e) => {
                  setSelectedAge(e.target.value);
                  setAgeError(""); // 선택할 때 에러 메시지 초기화
                }}
                sx={{ mb: 2 }}
              >
                <MenuItem value="0">선택</MenuItem>
                <MenuItem value="10">10대</MenuItem>
                <MenuItem value="20">20대</MenuItem>
                <MenuItem value="30">30대</MenuItem>
                <MenuItem value="40">40대</MenuItem>
                <MenuItem value="50">50대 이상</MenuItem>
              </Select>
              {ageError && (
                <Typography color="error" fontSize="small">
                  {ageError}
                </Typography>
              )}
              <Button onClick={handleNextClick} variant="contained">
                다음
              </Button>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <Button onClick={openPosterDialog} variant="outlined" sx={{ mb: 1 }} fullWidth>
                인상 깊게 본 영화 포스터 선택
              </Button>
              <Dialog open={showPosterDialog} onClose={handlePosterClose} maxWidth="lg" fullWidth>
                <DialogTitle>영화 포스터 선택</DialogTitle>
                <DialogContent style={{ width: "100%", height: "500px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    {moviePosters.map((poster, index) => (
                      <div
                        key={index}
                        style={{
                          margin: "4px",
                          cursor: "pointer",
                          flexBasis: "20%",
                          flexGrow: 10,
                        }}
                      >
                        <img src={poster.url} alt={`영화 포스터 ${index}`} onClick={() => handlePosterClick(poster.id)} style={{ width: "100%", height: "100%" }} />
                      </div>
                    ))}
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closePosterDialog} color="primary">
                    닫기
                  </Button>
                </DialogActions>
              </Dialog>
              {posterError && (
                <Typography color="error" fontSize="small">
                  {posterError}
                </Typography>
              )}
              <div>
                {/* "포스터 보기" 버튼 */}
                <Button onClick={openModal} variant="outlined" sx={{ mb: 10 }}>
                  {isPosterVisible ? "포스터 보기" : "포스터 보기 (+)"}
                </Button>

                {/* 포스터 모달 */}
                <Dialog open={isModalOpen} onClose={closeModal} maxWidth="lg" fullWidth>
                  <DialogTitle>영화 포스터</DialogTitle>
                  <DialogContent>
                    <img src={moviePosters.find((poster) => poster.id === selectedMovie)?.url} alt="선택한 영화 포스터" style={{ width: "100%", maxHeight: "500px" }} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={closeModal} color="primary">
                      닫기
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>

              <Select fullWidth variant="standard" value={preference_1} onChange={(e) => setPreference_1(e.target.value)} sx={{ mb: 6 }} disabled={!isMovieSelected}>
                <MenuItem value="0">영화 시청 우선 순위 첫번째</MenuItem>
                <MenuItem value="1" disabled={selectedPreferences.includes("1")}>
                  감독
                </MenuItem>
                <MenuItem value="2" disabled={selectedPreferences.includes("2")}>
                  장르
                </MenuItem>
                <MenuItem value="3" disabled={selectedPreferences.includes("3")}>
                  배우
                </MenuItem>
              </Select>
              {preference1Error && (
                <Typography color="error" fontSize="small" sx={{ mt: -3, mb: 3 }}>
                  {preference1Error}
                </Typography>
              )}

              <Select fullWidth variant="standard" value={preference_2} onChange={(e) => setPreference_2(e.target.value)} disabled={!isMovieSelected} sx={{ mb: 6 }}>
                <MenuItem value="0">영화 시청 우선 순위 두번째</MenuItem>
                <MenuItem value="1" disabled={selectedPreferences.includes("1")}>
                  감독
                </MenuItem>
                <MenuItem value="2" disabled={selectedPreferences.includes("2")}>
                  장르
                </MenuItem>
                <MenuItem value="3" disabled={selectedPreferences.includes("3")}>
                  배우
                </MenuItem>
              </Select>
              {preference2Error && (
                <Typography color="error" fontSize="small" sx={{ mt: -3, mb: 3 }}>
                  {preference2Error}
                </Typography>
              )}

              <Select fullWidth variant="standard" value={preference_3} onChange={(e) => setPreference_3(e.target.value)} disabled={!isMovieSelected} sx={{ mb: 5 }}>
                <MenuItem value="0">영화 시청 우선 순위 세번째</MenuItem>
                <MenuItem value="1" disabled={selectedPreferences.includes("1")}>
                  감독
                </MenuItem>
                <MenuItem value="2" disabled={selectedPreferences.includes("2")}>
                  장르
                </MenuItem>
                <MenuItem value="3" disabled={selectedPreferences.includes("3")}>
                  배우
                </MenuItem>
              </Select>
              {preference3Error && (
                <Typography color="error" fontSize="small" sx={{ mt: -3 }}>
                  {preference3Error}
                </Typography>
              )}
              <Box display="flex" justifyContent="space-between">
                <Button onClick={handlePrevClick} variant="outlined">
                  이전
                </Button>
                <Button onClick={signUpHandler} variant="contained">
                  회원가입
                </Button>
              </Box>
            </div>
          )}
        </Box>
        <Box mt="2em" display="flex" justifyContent="center" alignItems="center">
          <Typography variant="body2" sx={{ mt: 18 }}>
            이미 계정이 있으신가요?
            <span
              onClick={handleLoginClick}
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              로그인
            </span>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
