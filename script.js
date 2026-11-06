
// ===================================
// 01 音楽の再生・停止
// ===================================

const hanabi = new Audio("hanabi.mp3");
hanabi.loop = true;
hanabi.volume = 0.5;

const playButton = document.getElementById("playButton");

playButton.addEventListener("click", () => {
  if (hanabi.paused) {
    hanabi.play()
      .then(() => {
        playButton.textContent = "音楽を停止する";
      })
      .catch(() => {
        playButton.textContent = "再生できませんでした";
      });
  } else {
    hanabi.pause();
    playButton.textContent = "音楽を再生する";
  }
});


// ===================================
// 02 生活音クイズ
// ===================================

const quizOptions = document.querySelectorAll(".quiz-option");
const quizResult = document.getElementById("quizResult");

let selectedAnswers = [];

quizOptions.forEach((button) => {
  button.addEventListener("click", () => {

    const answer = button.dataset.answer;

    // 同じ選択肢を再度押した場合は選択解除
    if (selectedAnswers.includes(answer)) {
      selectedAnswers = selectedAnswers.filter(item => item !== answer);
      button.classList.remove("selected");
    } else {
      selectedAnswers.push(answer);
      button.classList.add("selected");
    }

    // 2つ選んだら正解判定
    if (selectedAnswers.length === 2) {

      const correctAnswers = ["door", "microwave"];

      const isCorrect =
        correctAnswers.every(item => selectedAnswers.includes(item));

      if (isCorrect) {
        quizResult.textContent =
          "正解です！ドアを開閉する音と、電子レンジの扉を閉める音でした。何気ない生活音も、音楽の一部になると新しい表情を見せてくれます。";
      } else {
        quizResult.textContent =
          "惜しいです！もう一度、音に耳をすませてみてください。正解は2つあります。";
      }

    } else if (selectedAnswers.length > 2) {

      selectedAnswers = [];
      quizOptions.forEach(item => item.classList.remove("selected"));

      quizResult.textContent =
        "選択をリセットしました。正解だと思う音を2つ選んでください。";

    } else {

      quizResult.textContent =
        "もう1つ、音の正体を選んでください。";

    }
  });
});


// ===================================
// 03 オリジナル空間づくり
// ===================================

const worldDescriptions = {
  fantasy: {
    name: "幻想的な世界",
    title: "光と音が織りなす、幻想の世界。",
    description:
      "光の色や音の響きが変化する空間。歩くたびに景色が移り変わり、まるで物語の中に入り込んだような体験が広がります。"
  },

  nature: {
    name: "自然に包まれる世界",
    title: "自然と一体になる、癒やしの世界。",
    description:
      "風や水の音、やわらかな光に包まれる空間。普段は気づかない自然の美しさを、五感を通して発見できます。"
  },

  future: {
    name: "未来を感じる世界",
    title: "想像を超える、未来の世界。",
    description:
      "映像や光、インタラクティブな仕掛けが連動する空間。自分の動きによって変化する景色が、新しい発見を生み出します。"
  }
};

const experienceDescriptions = {
  surprise: {
    name: "予想外の仕掛け",
    addition:
      "思いがけない演出が次々と現れ、訪れる人の「えっ！」という驚きが生まれます。"
  },

  together: {
    name: "誰かと一緒に楽しむ体験",
    addition:
      "一緒に参加することで自然と会話が生まれ、その場にいる人同士の笑顔が広がります。"
  },

  discover: {
    name: "新しい発見",
    addition:
      "見慣れたものにも新しい一面があることに気づき、誰かに伝えたくなる体験になります。"
  }
};

let selectedWorld = "";
let selectedExperience = "";

const worldButtons = document.querySelectorAll("[data-world]");
const experienceButtons = document.querySelectorAll("[data-experience]");

worldButtons.forEach(button => {
  button.addEventListener("click", () => {

    worldButtons.forEach(item => item.classList.remove("selected"));

    button.classList.add("selected");
    selectedWorld = button.dataset.world;

  });
});

experienceButtons.forEach(button => {
  button.addEventListener("click", () => {

    experienceButtons.forEach(item => item.classList.remove("selected"));

    button.classList.add("selected");
    selectedExperience = button.dataset.experience;

  });
});

const createButton = document.getElementById("createButton");

createButton.addEventListener("click", () => {

  const resultTitle = document.getElementById("resultTitle");
  const resultDescription = document.getElementById("resultDescription");

  if (!selectedWorld || !selectedExperience) {

    resultTitle.textContent = "あと少しで完成です。";
    resultDescription.textContent =
      "世界観と体験の両方を選択してください。";

    return;
  }

  const world = worldDescriptions[selectedWorld];
  const experience = experienceDescriptions[selectedExperience];

  resultTitle.textContent = world.title;

  resultDescription.textContent =
    world.description + experience.addition;

  document.getElementById("creationResult").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

});
