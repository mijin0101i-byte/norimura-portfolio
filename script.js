
// 01｜最初のボタンを押すと体験コーナーへ
document.getElementById("start").addEventListener("click", () => {
  document.getElementById("quiz").scrollIntoView({
    behavior: "smooth"
  });
});


// 02｜音のクイズ
const answers = document.querySelectorAll(".answer");
const quizResult = document.getElementById("quiz-result");

answers.forEach((button) => {
  button.addEventListener("click", () => {
    answers.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    if (button.dataset.correct === "true") {
      quizResult.textContent =
        "正解！実は、ドアの開閉音と電子レンジの扉を閉める音からできています。";
    } else {
      quizResult.textContent =
        "残念！身近なところに、意外な音楽の素材が隠れていました。";
    }
  });
});


// 03｜展示のアイデア
const designs = {
  "音": {
    title: "耳をすませば、世界が変わる。",
    description: "日常の音を重ね、自分だけの音風景をつくる体験。",
    background: "radial-gradient(circle, #66528b, #172338 75%)",
    symbol: "♫"
  },
  "光": {
    title: "光に触れると、景色が変わる。",
    description: "人の動きに反応して、光が空間いっぱいに広がる体験。",
    background: "radial-gradient(circle, #b18b59, #172338 75%)",
    symbol: "✧"
  },
  "色": {
    title: "色から、気持ちを見つける。",
    description: "選んだ色によって、空間の表情が変わっていく体験。",
    background: "radial-gradient(circle, #a85d78, #172338 75%)",
    symbol: "◉"
  },
  "動き": {
    title: "動くたび、世界が広がる。",
    description: "歩く・動くという行為そのものが、空間を変える体験。",
    background: "radial-gradient(circle, #477e85, #172338 75%)",
    symbol: "↗"
  }
};

// 04｜参加方法による変化
const methods = {
  "触れる": "自分の手で触れることで、空間に変化が生まれる。",
  "歩く": "歩いた軌跡が、空間の演出として残っていく。",
  "選ぶ": "自分の選択によって、世界の見え方が変わる。",
  "共有する": "誰かと体験を共有することで、新しい発見が生まれる。"
};

let selectedSense = "";
let selectedMethod = "";

// 05｜選択した内容をプレビューに反映
const preview = document.getElementById("preview");
const previewTitle = document.getElementById("preview-title");
const previewDescription = document.getElementById("preview-description");

function updatePreview() {
  if (!selectedSense || !selectedMethod) {
    return;
  }

  const design = designs[selectedSense];

  preview.style.background = design.background;
  previewTitle.textContent = design.symbol + " " + design.title;
  previewDescription.textContent =
    methods[selectedMethod] + " " + design.description;

  preview.animate(
    [
      { opacity: 0.5, transform: "scale(0.97)" },
      { opacity: 1, transform: "scale(1)" }
    ],
    {
      duration: 500,
      easing: "ease-out"
    }
  );
}

// 06｜感覚を選ぶ
document.querySelectorAll(".sense").forEach((button) => {
  button.addEventListener("click", () => {
    selectedSense = button.dataset.sense;

    document.querySelectorAll(".sense").forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    updatePreview();
  });
});

// 07｜参加方法を選ぶ
document.querySelectorAll(".method").forEach((button) => {
  button.addEventListener("click", () => {
    selectedMethod = button.dataset.method;

    document.querySelectorAll(".method").forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    updatePreview();
  });
});
const bgm = document.getElementById("bgm");
if (bgm) {
  bgm.volume = 0.5;
  document.addEventListener("click", async () => {
    try {
      if (bgm.paused) {
        await bgm.play();
      }
    } catch (error) {
      console.warn("BGM playback was blocked:", error);
    }
  }, { once: true });
}