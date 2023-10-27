async function getJake(){
    // using https://github.com/dword4/nhlapi 

    // get game id for latest pengins game
    const response1 = await fetch("https://statsapi.web.nhl.com/api/v1/teams/5?expand=team.schedule.previous");
    const previous = await response1.json();

    let link = previous["teams"][0]["previousGameSchedule"]["dates"][0]["games"][0]["link"];
    let game_id = link.split("/")[4];

    let away_id = previous["teams"][0]["previousGameSchedule"]["dates"][0]["games"][0]["teams"]["away"]["team"]["id"];

    let is_away;
    let not_is_away;
    if (away_id == 5) {
        is_away = "away";
        not_is_away = "home";
    } else {
        is_away = "home";
        not_is_away ="away";
    }

    let date = previous["teams"][0]["previousGameSchedule"]["dates"][0]["date"];

    // use game id to get details of game
    const response2 = await fetch("https://statsapi.web.nhl.com/api/v1/game/" + game_id + "/boxscore");
    const boxscore = await response2.json();

    let other_team = boxscore["teams"][not_is_away]["team"]["name"];

    let jake_str;
    let did_jake_score = "No. ";
    try {
        jake_score = boxscore["teams"][is_away]["players"]["ID8477404"]["stats"]["skaterStats"]["goals"];
        jake_str = "Jake scored " + jake_score + " point(s).";
        if (jake_score > 0) did_jake_score = "Yes! ";
    } catch {
        jake_str = "Jake did not play."
    }

    let text = did_jake_score + "The last Pittsburgh Penguins game was on " + date + " against the " + other_team + ". " + jake_str;
    document.getElementById("myText").innerHTML = text;
}
