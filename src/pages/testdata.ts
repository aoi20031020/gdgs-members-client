interface Student {
    name: string;
    email: string;
    grade: string;
    technology: string;
    marketing: string;
    event: string;
}

const students: { [key: string]: Student } = {
    "21G1101001L": { "name": "小野 潤一", "email": "a21.aaaa@g.chuo-u.ac.jp", "grade": "4", "technology": "1", "marketing": "1", "event": "0" },
    "21G1101002L": { "name": "山内 恵", "email": "a21.aaaa@g.chuo-u.ac.jp", "grade": "4", "technology": "0", "marketing": "1", "event": "0" },
    "22D1114012L": { "name": "大泉 あき", "email": "a22.aaaa@g.chuo-u.ac.jp", "grade": "3", "technology": "1", "marketing": "0", "event": "0" },
    "22G1101001L": { "name": "佐合 良", "email": "a22.aaaa@g.chuo-u.ac.jp", "grade": "3", "technology": "1", "marketing": "0", "event": "0" },
    "22G1101002L": { "name": "田中 雅晴", "email": "a22.aaaa@g.chuo-u.ac.jp", "grade": "3", "technology": "1", "marketing": "0", "event": "0" },
    "22G1101003L": { "name": "横田 美鈴", "email": "a22.aaaa@g.chuo-u.ac.jp", "grade": "3", "technology": "0", "marketing": "1", "event": "0" },
    "22G1101004L": { "name": "荒井 祐子", "email": "a22.aaaa@g.chuo-u.ac.jp", "grade": "3", "technology": "0", "marketing": "1", "event": "0" },
    "22G1101005L": { "name": "今野 雅", "email": "a22.aaaa@g.chuo-u.ac.jp", "grade": "3", "technology": "0", "marketing": "1", "event": "1" },
    "22G1101006L": { "name": "松川 雄也", "email": "a22.aaaa@g.chuo-u.ac.jp", "grade": "3", "technology": "0", "marketing": "1", "event": "1" },
    "22G1101007L": { "name": "澤田 昌昭", "email": "a22.aaaa@g.chuo-u.ac.jp", "grade": "3", "technology": "0", "marketing": "1", "event": "0" },
    "22G1101008L": { "name": "吉田 義和", "email": "a22.aaaa@g.chuo-u.ac.jp", "grade": "3", "technology": "0", "marketing": "1", "event": "1" },
    "23G1110003L": { "name": "清水 哲", "email": "a23.aaaa@g.chuo-u.ac.jp", "grade": "2", "technology": "1", "marketing": "1", "event": "0" },
    "23G1112014L": { "name": "清水 達夫", "email": "a23.aaaa@g.chuo-u.ac.jp", "grade": "2", "technology": "1", "marketing": "0", "event": "0" },
    "23G1112016L": { "name": "有山 孝広", "email": "a23.aaaa@g.chuo-u.ac.jp", "grade": "2", "technology": "1", "marketing": "0", "event": "0" },
    "23G1113017L": { "name": "酒井 学", "email": "a23.aaaa@g.chuo-u.ac.jp", "grade": "2", "technology": "0", "marketing": "1", "event": "0" },
    "23G1114018L": { "name": "近藤 久美", "email": "a23.aaaa@g.chuo-u.ac.jp", "grade": "2", "technology": "0", "marketing": "1", "event": "0" },
    "24D1108002L": { "name": "北村 恵理", "email": "a24.aaaa@g.chuo-u.ac.jp", "grade": "1", "technology": "1", "marketing": "0", "event": "0" },
    "24G1103001L": { "name": "小野 基", "email": "a24.aaaa@g.chuo-u.ac.jp", "grade": "1", "technology": "0", "marketing": "1", "event": "0" },
    "24G1103002L": { "name": "高橋 大輔", "email": "a24.aaaa@g.chuo-u.ac.jp", "grade": "1", "technology": "0", "marketing": "0", "event": "1" },
    "24G1101003L": { "name": "石原 義幸", "email": "a24.aaaa@g.chuo-u.ac.jp", "grade": "1", "technology": "0", "marketing": "0", "event": "1" }
};

export default students;