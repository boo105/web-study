let jwtObj = {};

// .gitignore 에 등록하자!
// 로컬로 돌릴거고 그냥 공부겸 테스트용도 라서 그냥 깃에다가 올릴거임
// secret 값은 절대 노출되서는 안됨
jwtObj.secret = "apple";

module.exports = jwtObj;