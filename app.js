/**
 * Shioya Football 3 - TheSportsDB版 (過去・未来 統合版)
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

// 2. 翻訳リスト（フラット版）
const TEAM_DISPLAYS = {
    // イングランド
    "Arsenal": "アーセナル", "Aston Villa": "アストン・ヴィラ", "Bournemouth": "ボーンマス",
    "Brentford": "ブレントフォード", "Brighton": "ブライトン", "Chelsea": "チェルシー",
    "Crystal Palace": "クリスタル・パレス", "Everton": "エヴァートン", "Fulham": "フラム",
    "Ipswich": "イプスウィッチ", "Leicester": "レスター", "Liverpool": "リヴァプール",
    "Man City": "マンチェスター・C", "Man United": "マンチェスター・U", "Newcastle": "ニューカッスル",
    "Nott'm Forest": "N・フォレスト", "Tottenham": "トッテナム", "West Ham": "ウェストハム",
    "Wolves": "ウルヴズ",
    
    // スペイン
    "Alaves": "アラベス", "Ath Bilbao": "ビルバオ", "Atletico Madrid": "アトレティコ",
    "Barcelona": "バルセロナ", "Celta Vigo": "セルタ", "Espanyol": "エスパニョール",
    "Getafe": "ヘタフェ", "Girona": "ジローナ", "Las Palmas": "ラス・パルマス",
    "Leganes": "レガネス", "Mallorca": "マジョルカ", "Osasuna": "オサスナ",
    "Rayo Vallecano": "ラージョ", "Real Betis": "ベティス", "Real Madrid": "レアル・マドリード",
    "Real Sociedad": "レアル・ソシエダ", "Sevilla": "セビージャ", "Valencia": "バレンシア",
    "Valladolid": "バジャドリード", "Villarreal": "ビジャレアル",

    // ドイツ
    "Bayern Munich": "バイエルン", "Borussia Dortmund": "ドルトムント", "RB Leipzig": "ライプツィヒ",
    "Stuttgart": "シュトゥットガルト", "Hoffenheim": "ホッフェンハイム", "Bayer Leverkusen": "レヴァークーゼン",
    "Eintracht Frankfurt": "フランクフルト", "Freiburg": "フライブルク", "Augsburg": "アウクスブルク",
    "Mainz": "マインツ", "Borussia Monchengladbach": "ボルシアMG", "Werder Bremen": "ブレーメン",
    "Union Berlin": "ウニオン・ベルリン", "FC Koln": "ケルン", "St Pauli": "ザンクトパウリ",
    "Wolfsburg": "ヴォルフスブルク", "Heidenheim": "ハイデンハイム", "Bochum": "ボーフム",
    
    // フランス
    "Monaco": "モナコ", "Paris SG": "パリSG", "Marseille": "マルセイユ",
    
    // 日本
    "Urawa Red Diamonds": "浦和レッズ"
    // ※TheSportsDBの表記揺れに対応するため、必要に応じて適宜追加してください。
};

// 3. 日本人選手データ
const JAPANESE_PLAYERS = {
    "Crystal Palace": ["鎌田大地"],
    "Liverpool": ["遠藤航"],
    "Brighton": ["三笘薫"],
    "Southampton": ["松木玖生"],
    "Leeds": ["田中碧"],
    "Blackburn": ["大橋祐紀", "森下龍矢"],
    "Coventry": ["坂元達裕"],
    "Hull City": ["平河悠"],
    "QPR": ["斉藤光毅"],
    "Stoke": ["瀬古樹"],
    "Birmingham": ["岩田智輝", "藤本寛也", "古橋亨梧"],
    "Real Sociedad": ["久保建英"],
    "Mallorca": ["浅野拓磨"],
    "Las Palmas": ["宮代大聖"],
    "Bayern Munich": ["伊藤洋輝"],
    "Freiburg": ["鈴木唯人"],
    "Werder Bremen": ["菅原由勢"],
    "Eintracht Frankfurt": ["小杉啓太", "堂安律"],
    "Hoffenheim": ["町田浩樹"],
    "Mainz": ["川崎颯太", "佐野海舟"],
    "Borussia Monchengladbach": ["高井幸大", "町野修斗"],
    "St Pauli": ["シュミット", "安藤", "原", "藤田"],
    "Wolfsburg": ["塩貝健人"],
    "Bochum": ["三好康児"],
    "Monaco": ["南野拓実"]
};

let currentMode = 'date'; 
let selectedDateOffset = 0;
let allEvents = []; 

function getFormattedDate(offset = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().split('T')[0];
}

function setMode(mode) {
    currentMode = mode;
    document.getElementById('mode-date').classList.toggle('active', mode === 'date');
    document.getElementById('mode-league').classList.toggle('active', mode === 'league');
    document.getElementById('date-tabs').style.display = (mode === 'date') ? 'flex' : 'none';
    render();
}

function selectDateTab(offset, tabId) {
    selectedDateOffset = offset;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    render();
}

// ▼▼▼ 修正箇所：過去と未来のデータを両方取得する ▼▼▼
async function fetchLeagueEvents(leagueId) {
    const cacheKey = `events_combined_${leagueId}`;
    const cached = localStorage.getItem(cacheKey);
    const now = new Date().getTime();

    if (cached) {
        const parsed = JSON.parse(cached);
        if (now - parsed.timestamp < 1000 * 60 * 30) { 
            return parsed.data;
        }
    }

    try {
        // past（直近の過去15試合）と next（直近の未来15試合）を並列取得
        const [pastRes, nextRes] = await Promise.all([
            fetch(`https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=${leagueId}`),
            fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=${leagueId}`)
        ]);

        const pastData = await pastRes.json();
        const nextData = await nextRes.json();

        const pastEvents = pastData.events || [];
        const nextEvents = nextData.events || [];

        // 過去と未来のデータを1つの配列に合体させる
        const combinedEvents = [...pastEvents, ...nextEvents];

        localStorage.setItem(cacheKey, JSON.stringify({ timestamp: now, data: combinedEvents }));
        return combinedEvents;
    } catch (e) {
        console.error(`Fetch error for ${leagueId}:`, e);
        return [];
    }
}
// ▲▲▲ 修正箇所ここまで ▲▲▲

async function loadAllData() {
    const container = document.getElementById('match-list');
    container.innerHTML = '<p class="status-msg">全リーグのデータを取得中...</p>';

    const promises = Object.values(COMPETITION_IDS).map(id => fetchLeagueEvents(id));
    const results = await Promise.all(promises);
    allEvents = results.flat(); 
    
    render();
}

function findTeamName(apiName) {
    if (!apiName) return "";
    if (TEAM_DISPLAYS[apiName]) return TEAM_DISPLAYS[apiName];
    for (const key in TEAM_DISPLAYS) {
        if (key.includes(apiName) || apiName.includes(key)) {
            return TEAM_DISPLAYS[key];
        }
    }
    return apiName; 
}

function findJapanesePlayers(apiName) {
    if (!apiName) return null;
    if (JAPANESE_PLAYERS[apiName]) return JAPANESE_PLAYERS[apiName];
    for (const key in JAPANESE_PLAYERS) {
        if (key.includes(apiName) || apiName.includes(key)) {
            return JAPANESE_PLAYERS[key];
        }
    }
    return null;
}

function render() {
    const container = document.getElementById('match-list');
    const isJapaneseOnly = document.getElementById('japanese-filter').checked;
    const leagueFilter = document.getElementById('league-filter').value;

    // 日付表示の更新
    if (currentMode === 'date') {
        const d = new Date();
        d.setDate(d.getDate() + selectedDateOffset);
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        const day = d.getDate();
        document.getElementById('date-display').innerText = `${y}年${m}月${day}日 の試合`;
    } else {
        document.getElementById('date-display').innerText = "";
    }

    let targetEvents = [];

    if (currentMode === 'date') {
        const targetDate = getFormattedDate(selectedDateOffset);
        targetEvents = allEvents.filter(ev => ev.dateEvent === targetDate);
    } else {
        targetEvents = allEvents.filter(ev => ev.idLeague === leagueFilter);
        
        // リーグモードの場合は、日付順に並び替える
        targetEvents.sort((a, b) => {
            const dateA = new Date(a.dateEvent + "T" + (a.strTime || "00:00:00"));
            const dateB = new Date(b.dateEvent + "T" + (b.strTime || "00:00:00"));
            return dateA - dateB;
        });
    }

    if (isJapaneseOnly) {
        targetEvents = targetEvents.filter(ev => findJapanesePlayers(ev.strHomeTeam) || findJapanesePlayers(ev.strAwayTeam));
    }

    if (targetEvents.length === 0) {
        container.innerHTML = '<p class="status-msg">表示できる試合がありません</p>';
        return;
    }

    container.innerHTML = targetEvents.map(ev => {
        const flag = LEAGUE_FLAGS[ev.idLeague] || "🏳️";
        const homeName = findTeamName(ev.strHomeTeam);
        const awayName = findTeamName(ev.strAwayTeam);
        
        const homePlayersList = findJapanesePlayers(ev.strHomeTeam);
        const awayPlayersList = findJapanesePlayers(ev.strAwayTeam);

        const homePlayers = homePlayersList ? `🇯🇵 ${homePlayersList.join(',')}` : "";
        const awayPlayers = awayPlayersList ? `🇯🇵 ${awayPlayersList.join(',')}` : "";

        const timeStr = ev.strTime ? ev.strTime.substring(0, 5) : "--:--";

        // ▼▼▼ スコア表示の追加 ▼▼▼
        let scoreDisplay = "VS";
        if (ev.intHomeScore !== null && ev.intAwayScore !== null) {
            scoreDisplay = `${ev.intHomeScore} - ${ev.intAwayScore}`;
        }

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
                    <div style="width: 20%; text-align: center; font-weight: bold; font-size: 1.2rem; color: #8b4513;">
                        ${scoreDisplay}
                    </div>
                    <div style="width: 40%; text-align: center;">
                        <div style="font-weight: bold;">${flag} ${awayName}</div>
                        ${awayPlayers ? `<div style="font-size: 0.7em; color: white; background: #0046A7; padding: 2px 5px; border-radius: 5px; margin-top: 5px; display: inline-block;">${awayPlayers}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('league-filter').addEventListener('change', render);
    document.getElementById('japanese-filter').addEventListener('change', render);
    loadAllData();
});
