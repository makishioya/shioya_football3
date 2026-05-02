/**
 * Shioya Football 3 - TheSportsDB版 (JST完全同期版)
 */

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

const LEAGUE_FLAGS = {
    "4328": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "4335": "🇪🇸", "4331": "🇩🇪", "4332": "🇮🇹", "4334": "🇫🇷",
    "4329": "🏴󠁧󠁢󠁥󠁮󠁧󠁿❷", "4344": "🇵🇹", "4337": "🇳🇱", "4338": "🇧🇪", "4324": "🇯🇵"
};

// 2. 翻訳リスト（フラット版・完全網羅版）
const TEAM_DISPLAYS = {
    // イングランド1部
    "Arsenal": "アーセナル", "Aston Villa": "アストン・ヴィラ", "Bournemouth": "ボーンマス",
    "Brentford": "ブレントフォード", "Brighton": "ブライトン", "Chelsea": "チェルシー",
    "Crystal Palace": "クリスタル・パレス", "Everton": "エヴァートン", "Fulham": "フラム",
    "Ipswich": "イプスウィッチ", "Leicester": "レスター", "Liverpool": "リヴァプール",
    "Man City": "マンチェスター・C", "Manchester City": "マンチェスター・C", "Man United": "マンチェスター・U", "Manchester United": "マンチェスター・U",
    "Newcastle": "ニューカッスル", "Nott'm Forest": "N・フォレスト", "Nottingham Forest": "N・フォレスト", 
    "Tottenham": "トッテナム", "West Ham": "ウェストハム", "Wolves": "ウルヴズ", "Wolverhampton": "ウルヴズ",
    
    // イングランド2部（日本人所属チームなど）
    "Blackburn": "ブラックバーン", "Burnley": "バーンリー", "Coventry": "コヴェントリー",
    "Derby": "ダービー", "Leeds": "あリーズ", "Luton": "ルートン", "Middlesbrough": "ミドルズブラ",
    "Millwall": "ミルウォール", "Norwich": "ノリッジ", "Oxford": "オックスフォード",
    "Plymouth": "プリマス", "Portsmouth": "ポーツマス", "Preston": "プレストン",
    "QPR": "QPR", "Queens Park Rangers": "QPR", "Sheffield Utd": "シェフィールド・U",
    "Sheffield Wed": "シェフィールド・W", "Stoke": "ストーク", "Sunderland": "サンダーランド",
    "Swansea": "スウォンジー", "Watford": "ワトフォード", "West Brom": "WBA",
    "Bristol City": "ブリストル・C", "Hull City": "ハル・シティ", "Southampton": "サウサンプトン",
    "Cardiff": "カーディフ", "Birmingham": "バーミンガム",

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
    "Leverkusen": "レヴァークーゼン", "Eintracht Frankfurt": "フランクフルト", "Freiburg": "フライブルク", 
    "Augsburg": "アウクスブルク", "Mainz": "マインツ", "Borussia Monchengladbach": "ボルシアMG", 
    "Werder Bremen": "ブレーメン", "Union Berlin": "ウニオン・ベルリン", "FC Koln": "ケルン", 
    "St Pauli": "ザンクトパウリ", "Wolfsburg": "ヴォルフスブルク", "Heidenheim": "ハイデンハイム", 
    "Bochum": "ボーフム", "Darmstadt": "ダルムシュタット", "Fortuna Dusseldorf": "デュッセルドルフ",

    // イタリア
    "Atalanta": "アタランタ", "Bologna": "ボローニャ", "Cagliari": "カリアリ", "Como": "コモ",
    "Empoli": "エンポリ", "Fiorentina": "フィオレンティーナ", "Genoa": "ジェノア", "Inter Milan": "インテル",
    "Inter": "インテル", "Juventus": "ユヴェントス", "Lazio": "ラツィオ", "Lecce": "レッチェ",
    "AC Milan": "ミラン", "Monza": "モンツァ", "Napoli": "ナポリ", "Parma": "パルマ",
    "Roma": "ローマ", "Torino": "トリノ", "Udinese": "ウディネーゼ", "Venezia": "ヴェネツィア",
    "Verona": "ヴェローナ",
    
    // フランス
    "Monaco": "モナコ", "Paris SG": "パリSG", "Marseille": "マルセイユ", "Le Havre": "ル・アーヴル",
    "Lyon": "リヨン", "Lille": "リール", "Lens": "ランス", "Brest": "ブレスト", "Rennes": "レンヌ",
    "Nice": "ニース", "Reims": "スタッド・ランス", "Toulouse": "トゥールーズ", "Nantes": "ナント",
    
    // オランダ・ベルギー・ポルトガル・スコットランド
    "Ajax": "アヤックス", "Feyenoord": "フェイエノールト", "PSV Eindhoven": "PSV", "AZ Alkmaar": "AZ",
    "Anderlecht": "アンデルレヒト", "Club Brugge": "クラブ・ブルッヘ", "Genk": "ヘンク", 
    "Sint-Truiden": "シント＝トロイデン", "OH Leuven": "OHルーヴェン", "Westerlo": "ウェステルロー",
    "Benfica": "ベンフィカ", "Porto": "ポルト", "Sporting CP": "スポルティング", "Celtic": "セルティック",
    
    // Jリーグ
    "Albirex Niigata": "新潟", "Avispa Fukuoka": "福岡", "Cerezo Osaka": "C大阪", "Consadole Sapporo": "札幌",
    "FC Tokyo": "FC東京", "Gamba Osaka": "G大阪", "Jubilo Iwata": "磐田", "Kashima Antlers": "鹿島",
    "Kashiwa Reysol": "柏", "Kawasaki Frontale": "川崎F", "Kyoto Sanga": "京都", "Machida Zelvia": "町田",
    "Nagoya Grampus": "名古屋", "Sagan Tosu": "鳥栖", "Sanfrecce Hiroshima": "広島", 
    "Shonan Bellmare": "湘南", "Tokyo Verdy": "東京V", "Urawa Red Diamonds": "浦和レッズ", 
    "Vissel Kobe": "神戸", "Yokohama F. Marinos": "横浜FM"
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

// 日本時間の「YYYY-MM-DD」を正確に取得する
function getFormattedDate(offset = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
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

// ▼▼▼ ここから書き換え ▼▼▼

async function fetchLeagueEvents(leagueId) {
    const cacheKey = `events_v7_${leagueId}`; // v7に変更して古いキャッシュを破棄
    const cached = localStorage.getItem(cacheKey);
    const now = new Date().getTime();

    if (cached) {
        const parsed = JSON.parse(cached);
        if (now - parsed.timestamp < 1000 * 60 * 30) return parsed.data;
    }

    try {
        const pastRes = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=${leagueId}`);
        const pastData = await pastRes.json();

        // サーバーへの負荷を避けるため 1秒 待機
        await new Promise(resolve => setTimeout(resolve, 1000));

        const nextRes = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=${leagueId}`);
        const nextData = await nextRes.json();

        const combined = [...(pastData.events || []), ...(nextData.events || [])];
        
        // 【修正】取得できた件数が1件以上ある場合のみキャッシュに保存する（空データ記憶の防止）
        if (combined.length > 0) {
            localStorage.setItem(cacheKey, JSON.stringify({ timestamp: now, data: combined }));
        }
        
        return combined;
    } catch (e) {
        console.error(`リーグID ${leagueId} の取得に失敗:`, e);
        return [];
    }
}

async function loadAllData() {
    const container = document.getElementById('match-list');
    const leagueIds = Object.values(COMPETITION_IDS);
    allEvents = []; 

    // Promise.all をやめ、1リーグずつ「順番に」取得する（直列処理）
    for (let i = 0; i < leagueIds.length; i++) {
        // 画面に現在の進捗状況を表示
        container.innerHTML = `<p class="status-msg">試合データを取得中...<br>(${i + 1} / ${leagueIds.length} リーグ完了)</p>`;
        
        const events = await fetchLeagueEvents(leagueIds[i]);
        allEvents = allEvents.concat(events);

        // 次のリーグを取得する前に 0.3秒 待機
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log(`取得済み試合数: ${allEvents.length}`); 
    render();
}

// ▲▲▲ ここまで書き換え ▲▲▲

function findTeamName(apiName) {
    if (!apiName) return "";
    if (TEAM_DISPLAYS[apiName]) return TEAM_DISPLAYS[apiName];
    for (const key in TEAM_DISPLAYS) {
        if (key.includes(apiName) || apiName.includes(key)) return TEAM_DISPLAYS[key];
    }
    return apiName; 
}

function findJapanesePlayers(apiName) {
    if (!apiName) return null;
    if (JAPANESE_PLAYERS[apiName]) return JAPANESE_PLAYERS[apiName];
    for (const key in JAPANESE_PLAYERS) {
        if (key.includes(apiName) || apiName.includes(key)) return JAPANESE_PLAYERS[key];
    }
    return null;
}

function render() {
    const container = document.getElementById('match-list');
    const isJapaneseOnly = document.getElementById('japanese-filter').checked;
    const leagueFilter = document.getElementById('league-filter').value;

    function getJSTInfo(event) {
        // strTimestampをパースしてJSTに変換
        const utcStr = event.strTimestamp ? event.strTimestamp.replace(" ", "T") : `${event.dateEvent}T${event.strTime || "00:00:00"}`;
        const dateObj = new Date(utcStr + (utcStr.includes("Z") ? "" : "Z"));
        const jstDate = dateObj.toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' });
        const jstTime = dateObj.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' });
        return { jstDate, jstTime, timestamp: dateObj.getTime() };
    }

    if (currentMode === 'date') {
        const d = new Date();
        d.setDate(d.getDate() + selectedDateOffset);
        document.getElementById('date-display').innerText = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 の試合`;
    } else {
        document.getElementById('date-display').innerText = "";
    }

    let targetEvents = [];
    if (currentMode === 'date') {
        const targetDate = getFormattedDate(selectedDateOffset);
        targetEvents = allEvents.filter(ev => getJSTInfo(ev).jstDate === targetDate);
    } else {
        targetEvents = allEvents.filter(ev => ev.idLeague === leagueFilter);
        targetEvents.sort((a, b) => getJSTInfo(a).timestamp - getJSTInfo(b).timestamp);
    }

    if (isJapaneseOnly) {
        targetEvents = targetEvents.filter(ev => findJapanesePlayers(ev.strHomeTeam) || findJapanesePlayers(ev.strAwayTeam));
    }

    if (targetEvents.length === 0) {
        container.innerHTML = '<p class="status-msg">表示できる試合がありません</p>';
        return;
    }

    container.innerHTML = targetEvents.map(ev => {
        const { jstDate, jstTime } = getJSTInfo(ev);
        const homePlayersList = findJapanesePlayers(ev.strHomeTeam);
        const awayPlayersList = findJapanesePlayers(ev.strAwayTeam);
        const scoreDisplay = (ev.intHomeScore !== null && ev.intAwayScore !== null) ? `${ev.intHomeScore} - ${ev.intAwayScore}` : "VS";

        return `
            <div class="match-card">
                <div style="font-size: 0.8em; color: #666; text-align: center; margin-bottom: 8px;">
                    ${jstDate} ${jstTime} (日本時間)
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="width: 40%; text-align: center;">
                        <div style="font-weight: bold;">${LEAGUE_FLAGS[ev.idLeague] || "🏳️"} ${findTeamName(ev.strHomeTeam)}</div>
                        ${homePlayersList ? `<div style="font-size: 0.75em; color: white; background: #0046A7; padding: 2px 5px; border-radius: 5px; margin-top: 5px; display: inline-block;">🇯🇵 ${homePlayersList.join(',')}</div>` : ''}
                    </div>
                    <div style="width: 20%; text-align: center; font-weight: bold; font-size: 1.2rem; color: #8b4513;">${scoreDisplay}</div>
                    <div style="width: 40%; text-align: center;">
                        <div style="font-weight: bold;">${LEAGUE_FLAGS[ev.idLeague] || "🏳️"} ${findTeamName(ev.strAwayTeam)}</div>
                        ${awayPlayersList ? `<div style="font-size: 0.75em; color: white; background: #0046A7; padding: 2px 5px; border-radius: 5px; margin-top: 5px; display: inline-block;">🇯🇵 ${awayPlayersList.join(',')}</div>` : ''}
                    </div>
                </div>
            </div>`;
    }).join('');
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('league-filter').addEventListener('change', render);
    document.getElementById('japanese-filter').addEventListener('change', render);
    loadAllData();
});
