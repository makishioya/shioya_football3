/**
 * Shioya Football 3 - TheSportsDB版 完全版
 */

// 1. リーグ設定（TheSportsDBのID）
const COMPETITION_IDS = {
    "premier_league": "4328",
    "laliga": "4335",
    "bundesliga": "4331",
    "serie_a": "4332",
    "ligue_1": "4334",
    "championship": "4329",
    "portugal": "4344",
    "netherlands": "4337",
    "belgium": "4338",
    "j_league": "4324"
};

const MAJOR_LEAGUE_IDS = ["4328", "4335", "4331", "4332", "4334"];

const LEAGUE_FLAGS = {
    "4328": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "4335": "🇪🇸", "4331": "🇩🇪", "4332": "🇮🇹", "4334": "🇫🇷",
    "4329": "🏴󠁧󠁢󠁥󠁮󠁧󠁿❷", "4344": "🇵🇹", "4337": "🇳🇱", "4338": "🇧🇪", "4324": "🇯🇵"
};


const TEAM_DISPLAYS = {
    // イングランド
    "Arsenal FC": "アーセナル",
    "Aston Villa FC": "アストン・ヴィラ",
    "AFC Bournemouth": "ボーンマス",
    "Brentford FC": "ブレントフォード",
    "Brighton & Hove Albion FC": "ブライトン",
    "Chelsea FC": "チェルシー",
    "Crystal Palace FC": "クリスタル・パレス",
    "Everton FC": "エヴァートン",
    "Fulham FC": "フラム",
    "Ipswich Town FC": "イプスウィッチ",
    "Leicester City FC": "レスター",
    "Liverpool FC": "リヴァプール",
    "Manchester City FC": "マンチェスター・C",
    "Manchester United FC": "マンチェスター・U",
    "Newcastle United FC": "ニューカッスル",
    "Nottingham Forest FC": "N・フォレスト",
    "Tottenham Hotspur FC": "トッテナム",
    "West Ham United FC": "ウェストハム",
    "Wolverhampton Wanderers FC": "ウルヴズ",
    "Blackburn Rovers FC": "ブラックバーン",
    "Burnley FC": "バーンリー",
    "Coventry City FC": "コヴェントリー",
    "Derby County FC": "ダービー",
    "Leeds United FC": "リーズ",
    "Luton Town FC": "ルートン",
    "Middlesbrough FC": "ミドルズブラ",
    "Millwall FC": "ミルウォール",
    "Norwich City FC": "ノリッジ",
    "Oxford United FC": "オックスフォード",
    "Plymouth Argyle FC": "プリマス",
    "Portsmouth FC": "ポーツマス",
    "Preston North End FC": "プレストン",
    "Queens Park Rangers FC": "QPR",
    "Sheffield United FC": "シェフィールド・U",
    "Sheffield Wednesday FC": "シェフィールド・W",
    "Stoke City FC": "ストーク",
    "Sunderland AFC": "サンダーランド",
    "Swansea City AFC": "スウォンジー",
    "Watford FC": "ワトフォード",
    "West Bromwich Albion FC": "WBA",
    "Bristol City FC": "ブリストル・C",
    "Hull City AFC": "ハル・シティ",
    "Southampton FC": "サウサンプトン",
    "Cardiff City FC": "カーディフ",
    "Birmingham City FC": "バーミンガム",

    // スペイン
    "Deportivo Alavés": "アラベス",
    "Athletic Club": "ビルバオ",
    "Club Atlético de Madrid": "アトレティコ",
    "FC Barcelona": "バルセロナ",
    "RC Celta de Vigo": "セルタ",
    "RCD Espanyol de Barcelona": "エスパニョール",
    "Getafe CF": "ヘタフェ",
    "Girona FC": "ジローナ",
    "UD Las Palmas": "ラス・パルマス",
    "CD Leganés": "レガネス",
    "RCD Mallorca": "マジョルカ",
    "CA Osasuna": "オサスナ",
    "Rayo Vallecano de Madrid": "ラージョ",
    "Real Betis Balompié": "ベティス",
    "Real Madrid CF": "レアル・マドリード",
    "Real Sociedad de Fútbol": "レアル・ソシエダ",
    "Sevilla FC": "セビージャ",
    "Valencia CF": "バレンシア",
    "Real Valladolid CF": "バジャドリード",
    "Villarreal CF": "ビジャレアル",

    // ドイツ
    "FC Bayern München": "バイエルン",
    "Borussia Dortmund": "ドルトムント",
    "RB Leipzig": "ライプツィヒ",
    "VfB Stuttgart": "シュトゥットガルト",
    "TSG 1899 Hoffenheim": "ホッフェンハイム",
    "Bayer 04 Leverkusen": "レヴァークーゼン",
    "Eintracht Frankfurt": "フランクフルト",
    "SC Freiburg": "フライブルク",
    "FC Augsburg": "アウクスブルク",
    "1. FSV Mainz 05": "マインツ",
    "Borussia Mönchengladbach": "ボルシアMG",
    "SV Werder Bremen": "ブレーメン",
    "1. FC Union Berlin": "ウニオン・ベルリン",
    "1. FC Köln": "ケルン",
    "Hamburger SV": "ハンブルガーSV",
    "FC St. Pauli 1910": "ザンクトパウリ",
    "VfL Wolfsburg": "ヴォルフスブルク",
    "1. FC Heidenheim 1846": "ハイデンハイム",
    "VfL Bochum 1848": "ボーフム",
    "Fortuna Düsseldorf": "デュッセルドルフ",
    "SV Darmstadt 98": "ダルムシュタット",
    "Hannover 96": "ハノーファー",
    "Karlsruher SC": "カールスルーエ",
    "SC Preußen Münster": "P・ミュンスター",

    // イタリア
    "Atalanta BC": "アタランタ",
    "Bologna FC 1909": "ボローニャ",
    "Cagliari Calcio": "カリアリ",
    "Como 1907": "コモ",
    "Empoli FC": "エンポリ",
    "ACF Fiorentina": "フィオレンティーナ",
    "Genoa CFC": "ジェノア",
    "FC Internazionale Milano": "インテル",
    "Juventus FC": "ユヴェントス",
    "SS Lazio": "ラツィオ",
    "US Lecce": "レッチェ",
    "AC Milan": "ミラン",
    "AC Monza": "モンツァ",
    "SSC Napoli": "ナポリ",
    "Parma Calcio 1913": "パルマ",
    "AS Roma": "ローマ",
    "Torino FC": "トリノ",
    "Udinese Calcio": "ウディネーゼ",
    "Venezia FC": "ヴェネツィア",
    "Hellas Verona FC": "ヴェローナ",

    // フランス
    "Angers SCO": "アンジェ",
    "AJ Auxerre": "オセール",
    "Stade Brestois 29": "ブレスト",
    "Le Havre AC": "ル・アーヴル",
    "RC Lens": "ランス",
    "Lille OSC": "リール",
    "Olympique Lyonnais": "リヨン",
    "Olympique de Marseille": "マルセイユ",
    "AS Monaco FC": "モナコ",
    "Montpellier HSC": "モンペリエ",
    "FC Nantes": "ナント",
    "OGC Nice": "ニース",
    "Paris Saint-Germain FC": "パリSG",
    "Stade de Reims": "スタッド・ランス",
    "Stade Rennais FC 1901": "レンヌ",
    "AS Saint-Étienne": "サンテティエンヌ",
    "RC Strasbourg Alsace": "ストラスブール",
    "Toulouse FC": "トゥールーズ",

    // ポルトガル
    "SL Benfica": "ベンフィカ",
    "Boavista FC": "ボアヴィスタ",
    "SC Braga": "ブラガ",
    "Casa Pia AC": "カーザ・ピア",
    "GD Estoril Praia": "エストリル",
    "CF Estrela da Amadora": "エストレラ",
    "FC Famalicão": "ファマリカン",
    "SC Farense": "ファレンセ",
    "FC Porto": "ポルト",
    "Gil Vicente FC": "ジル・ヴィセンテ",
    "Moreirense FC": "モレイレンセ",
    "CD Nacional": "ナシオナル",
    "Rio Ave FC": "リオ・アヴェ",
    "CD Santa Clara": "サンタ・クララ",
    "Sporting Clube de Portugal": "スポルティング",
    "Vitória SC": "ヴィトーリア",
    "AVS Futebol SAD": "AVS",
    "FC Arouca": "アロウカ",

    // オランダ
    "AFC Ajax": "アヤックス",
    "Almere City FC": "アルメレ・シティ",
    "AZ": "AZ",
    "Feyenoord Rotterdam": "フェイエノールト",
    "Fortuna Sittard": "フォルトゥナ",
    "Go Ahead Eagles": "ゴー・アヘッド",
    "FC Groningen": "フローニンゲン",
    "SC Heerenveen": "ヘーレンフェーン",
    "Heracles Almelo": "ヘラクレス",
    "NAC Breda": "NAC",
    "NEC": "NEC",
    "PEC Zwolle": "ズヴォレ",
    "PSV": "PSV",
    "RKC Waalwijk": "RKC",
    "Sparta Rotterdam": "スパルタ",
    "FC Twente '65": "トゥウェンテ",
    "FC Utrecht": "ユトレヒト",
    "Willem II Tilburg": "ヴィレムII",

    // ベルギー
    "RSC Anderlecht": "アンデルレヒト",
    "Royal Antwerp FC": "アントワープ",
    "Cercle Brugge KSV": "セルクル・ブルッヘ",
    "Sporting du Pays de Charleroi": "シャルルロワ",
    "Club Brugge KV": "クラブ・ブルッヘ",
    "FCV Dender EH": "デンデル",
    "KRC Genk": "ヘンク",
    "KAA Gent": "ヘント",
    "KV Kortrijk": "コルトレイク",
    "KV Mechelen": "メヘレン",
    "Oud-Heverlee Leuven": "OHルーヴェン",
    "K. Sint-Truidense VV": "シント＝トロイデン",
    "Standard de Liège": "S・リエージュ",
    "Royale Union Saint-Gilloise": "サン＝ジロワーズ",
    "KVC Westerlo": "ウェステルロー",
    "SV Zulte Waregem": "ズルテ・ワレヘム",

    // Jリーグ
    "Albirex Niigata": "新潟",
    "Avispa Fukuoka": "福岡",
    "Cerezo Osaka": "C大阪",
    "Consadole Sapporo": "札幌",
    "FC Tokyo": "FC東京",
    "Gamba Osaka": "G大阪",
    "Jubilo Iwata": "磐田",
    "Kashima Antlers": "鹿島",
    "Kashiwa Reysol": "柏",
    "Kawasaki Frontale": "川崎F",
    "Kyoto Sanga": "京都",
    "Machida Zelvia": "町田",
    "Nagoya Grampus": "名古屋",
    "Sagan Tosu": "鳥栖",
    "Sanfrecce Hiroshima": "広島",
    "Shonan Bellmare": "湘南",
    "Tokyo Verdy": "東京V",
    "Urawa Red Diamonds": "浦和",
    "Vissel Kobe": "神戸",
    "Yokohama F. Marinos": "横浜FM",

    // その他
    "Celtic FC": "セルティック"
};

// 日本人選手データ
const JAPANESE_PLAYERS = {
    "Crystal Palace FC": ["鎌田大地"],
    "Liverpool FC": ["遠藤航"],
    "Brighton & Hove Albion FC": ["三笘薫"],
    "Southampton FC": ["松木玖生"],
    "Southampton": ["松木玖生"],
    "Leeds United FC": ["田中碧"],
    "Leeds": ["田中碧"],
    "Blackburn Rovers FC": ["大橋祐紀", "森下龍矢"],
    "Blackburn": ["大橋祐紀", "森下龍矢"],
    "Coventry City FC": ["坂元達裕"],
    "Coventry": ["坂元達裕"],
    "Hull City AFC": ["平河悠"],
    "Hull City": ["平河悠"],
    "Queens Park Rangers FC": ["斉藤光毅"],
    "QPR": ["斉藤光毅"],
    "Stoke City FC": ["瀬古樹"],
    "Stoke": ["瀬古樹"],
    "Birmingham City FC": ["岩田智輝", "藤本寛也", "古橋亨梧"],
    "Birmingham": ["岩田智輝", "藤本寛也", "古橋亨梧"],

    "Real Sociedad de Fútbol": ["久保建英"],
    "Real Sociedad": ["久保建英"],
    "RCD Mallorca": ["浅野拓磨"],
    "Mallorca": ["浅野拓磨"],
    "UD Las Palmas": ["宮代大聖"],
    "Las Palmas": ["宮代大聖"],

    "FC Bayern München": ["伊藤洋輝"],
    "Bayern München": ["伊藤洋輝"],
    "SC Freiburg": ["鈴木唯人"],
    "Freiburg": ["鈴木唯人"],
    "SV Werder Bremen": ["菅原由勢"],
    "Werder Bremen": ["菅原由勢"],
    "Eintracht Frankfurt": ["小杉啓太", "堂安律"],
    "TSG 1899 Hoffenheim": ["町田浩樹"],
    "Hoffenheim": ["町田浩樹"],
    "1. FSV Mainz 05": ["川崎颯太", "佐野海舟"],
    "Mainz 05": ["川崎颯太", "佐野海舟"],
    "Borussia Mönchengladbach": ["高井幸大", "町野修斗"],
    "FC St. Pauli 1910": ["ニック・シュミット", "安藤智哉", "原大智", "藤田譲瑠チマ"],
    "St. Pauli": ["ニック・シュミット", "安藤智哉", "原大智", "藤田譲瑠チマ"],
    "VfL Wolfsburg": ["塩貝健人"],
    "Wolfsburg": ["塩貝健人"],
    "VfL Bochum 1848": ["三好康児"],
    "Bochum": ["三好康児"],
    "Fortuna Düsseldorf": ["アペルカンプ真大", "田中聡"],
    "SV Darmstadt 98": ["秋山裕紀", "古川陽介"],
    "Darmstadt": ["秋山裕紀", "古川陽介"],

    "Parma Calcio 1913": ["鈴木彩艶"],
    "Parma": ["鈴木彩艶"],

    "AS Monaco FC": ["南野拓実"],
    "Monaco": ["南野拓実"],
    "Le Havre AC": ["瀬古歩夢"],
    "Le Havre": ["瀬古歩夢"],

    "Oud-Heverlee Leuven": ["明本考浩", "大南拓磨"],
    "OH Leuven": ["明本考浩", "大南拓磨"],
    "KVC Westerlo": ["木村誠二", "齋藤俊輔", "坂本一彩"],
    "Westerlo": ["木村誠二", "齋藤俊輔", "坂本一彩"],
    "KRC Genk": ["伊東純也", "横山歩夢", "吉永夢希"],
    "Genk": ["伊東純也", "横山歩夢", "吉永夢希"],
    "K. Sint-Truidense VV": ["伊藤涼太郎", "小久保玲央ブライアン", "後藤啓介", "新川志音", "谷口彰悟", "畑大雅", "松澤海斗", "山本理仁"],
    "Sint-Truiden": ["伊藤涼太郎", "小久保玲央ブライアン", "後藤啓介", "新川志音", "谷口彰悟", "畑大雅", "松澤海斗", "山本理仁"],

    "AFC Ajax": ["板倉滉", "冨安健洋"],
    "Ajax": ["板倉滉", "冨安健洋"],
    "Feyenoord Rotterdam": ["上田綺世", "渡辺剛"],
    "Feyenoord": ["上田綺世", "渡辺剛"],

    "Sporting Clube de Portugal": ["守田英正"],
    "Sporting CP": ["守田英正"],
    
    "Celtic FC": ["旗手怜央", "前田大然"],
    "Celtic": ["旗手怜央", "前田大然"]
};

let currentMode = 'date'; // 'date' or 'league'
let selectedDateOffset = 0;
let allEvents = []; // 取得した全試合を保持

// ユーティリティ: 日付フォーマット (YYYY-MM-DD)
function getFormattedDate(offset = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().split('T')[0];
}

// モード切り替え
function setMode(mode) {
    currentMode = mode;
    document.getElementById('mode-date').classList.toggle('active', mode === 'date');
    document.getElementById('mode-league').classList.toggle('active', mode === 'league');
    document.getElementById('date-tabs').style.display = (mode === 'date') ? 'flex' : 'none';
    render();
}

// 日付タブ切り替え
function selectDateTab(offset, tabId) {
    selectedDateOffset = offset;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    render();
}

// データの取得 (キャッシュ対応)
async function fetchLeagueEvents(leagueId) {
    const cacheKey = `events_${leagueId}`;
    const cached = localStorage.getItem(cacheKey);
    const now = new Date().getTime();

    if (cached) {
        const parsed = JSON.parse(cached);
        if (now - parsed.timestamp < 1000 * 60 * 30) { // 30分間はキャッシュ有効
            return parsed.data;
        }
    }

    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=${leagueId}`);
        const data = await response.json();
        const events = data.events || [];
        localStorage.setItem(cacheKey, JSON.stringify({ timestamp: now, data: events }));
        return events;
    } catch (e) {
        console.error(`Fetch error for ${leagueId}:`, e);
        return [];
    }
}

// 全データの一括取得 (並列実行)
async function loadAllData() {
    const container = document.getElementById('match-list');
    container.innerHTML = '<p class="status-msg">全リーグのデータを取得中...</p>';

    const promises = Object.values(COMPETITION_IDS).map(id => fetchLeagueEvents(id));
    const results = await Promise.all(promises);
    allEvents = results.flat(); // すべての試合を一つの配列に合体
    
    render();
}

// 描画処理
function render() {
    const container = document.getElementById('match-list');
    const isJapaneseOnly = document.getElementById('japanese-filter').checked;
    const leagueFilter = document.getElementById('league-filter').value;

    function findTeamName(apiName) {
        // 完全一致を最初に試す
        if (TEAM_DISPLAYS[apiName]) return TEAM_DISPLAYS[apiName];

        // 完全一致しない場合、APIの名前で「始まる」または「含まれる」キーを探す
        for (const key in TEAM_DISPLAYS) {
             // 例: "Arsenal FC".includes("Arsenal") 
            if (key.includes(apiName) || apiName.includes(key)) {
                return TEAM_DISPLAYS[key];
            }
        }
        return apiName; // 見つからなければ元の名前を返す
    }

    function findJapanesePlayers(apiName) {
        if (JAPANESE_PLAYERS[apiName]) return JAPANESE_PLAYERS[apiName];

        for (const key in JAPANESE_PLAYERS) {
            if (key.includes(apiName) || apiName.includes(key)) {
                return JAPANESE_PLAYERS[key];
            }
        }
        return null;
    }

    let targetEvents = [];

    if (currentMode === 'date') {
        // 日付モード: 全リーグから指定日の試合を抽出
        const targetDate = getFormattedDate(selectedDateOffset);
        targetEvents = allEvents.filter(ev => ev.dateEvent === targetDate);
    } else {
        // リーグモード: 指定された1リーグの直近15試合を表示
        targetEvents = allEvents.filter(ev => ev.idLeague === leagueFilter);
    }

    // 日本人フィルタ
    if (isJapaneseOnly) {
        targetEvents = targetEvents.filter(ev => JAPANESE_PLAYERS[ev.strHomeTeam] || JAPANESE_PLAYERS[ev.strAwayTeam]);
    }

    if (targetEvents.length === 0) {
        container.innerHTML = '<p class="status-msg">表示できる試合がありません</p>';
        return;
    }

    container.innerHTML = targetEvents.map(ev => {
        const flag = LEAGUE_FLAGS[ev.idLeague] || "🏳️";
        const homeName = TEAM_DISPLAYS[ev.strHomeTeam] || ev.strHomeTeam;
        const awayName = TEAM_DISPLAYS[ev.strAwayTeam] || ev.strAwayTeam;
        
        const homePlayers = JAPANESE_PLAYERS[ev.strHomeTeam] ? `🇯🇵 ${JAPANESE_PLAYERS[ev.strHomeTeam].join(',')}` : "";
        const awayPlayers = JAPANESE_PLAYERS[ev.strAwayTeam] ? `🇯🇵 ${JAPANESE_PLAYERS[ev.strAwayTeam].join(',')}` : "";

        // 時間を日本時間に変換 (TheSportsDBはUTCなので+9時間)
        // ※簡易的に表示するなら strTime をそのまま使用
        const timeStr = ev.strTime ? ev.strTime.substring(0, 5) : "--:--";

        return `
            <div class="match-card">
                <div style="font-size: 0.8em; color: #666; text-align: center; margin-bottom: 8px;">
                    ${ev.dateEvent} ${timeStr} (${ev.strLeague})
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="width: 40%; text-align: center;">
                        <div style="font-weight: bold;">${flag} ${homeName}</div>
                        ${homePlayers ? `<div style="font-size: 0.7em; color: white; background: #0046A7; padding: 2px 5px; border-radius: 5px; margin-top: 5px; display: inline-block;">${homePlayers}</div>` : ''}
                    </div>
                    <div style="width: 20%; text-align: center; font-weight: bold; font-size: 1.2rem;">VS</div>
                    <div style="width: 40%; text-align: center;">
                        <div style="font-weight: bold;">${flag} ${awayName}</div>
                        ${awayPlayers ? `<div style="font-size: 0.7em; color: white; background: #0046A7; padding: 2px 5px; border-radius: 5px; margin-top: 5px; display: inline-block;">${awayPlayers}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 初期化
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('league-filter').addEventListener('change', render);
    document.getElementById('japanese-filter').addEventListener('change', render);
    loadAllData();
});
