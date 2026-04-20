const themeData = {
  system: {
    theme: "시스템 위니언 테마",
    pageClass: "theme-system-page",
    cardClass: "theme-system"
  },
  ion: {
    theme: "아이온 테마",
    pageClass: "theme-ion-page",
    cardClass: "theme-ion"
  },
  bo: {
    theme: "보 테마",
    pageClass: "theme-bo-page",
    cardClass: "theme-bo"
  },
  grid: {
    theme: "그리드 테마",
    pageClass: "theme-grid-page",
    cardClass: "theme-grid"
  },
  fix: {
    theme: "픽스 테마",
    pageClass: "theme-fix-page",
    cardClass: "theme-fix"
  },
  debug: {
    theme: "디버그 테마",
    pageClass: "theme-debug-page",
    cardClass: "theme-debug"
  },
    float: {
    theme: "플로트 테마",
    pageClass: "theme-float-page",
    cardClass: "theme-float"
  }
};

const EMPTY_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

const el = {
  body: document.body,
  theme: document.getElementById("theme"),
  hateFree: document.getElementById("hateFree"),
  previewHate: document.getElementById("previewHate"),
  profileUpload: document.getElementById("profileUpload"),
  username: document.getElementById("username"),
  age: document.getElementById("age"),
  fubfree: document.getElementById("fubfree"),
  gameOwned: document.getElementById("gameOwned"),
  favorite: document.getElementById("favorite"),
  pairing: document.getElementById("pairing"),
  oneLine: document.getElementById("oneLine"),
  creationFree: document.getElementById("creationFree"),
  tweetFree: document.getElementById("tweetFree"),
  saveBtn: document.getElementById("saveBtn"),
  resetBtn: document.getElementById("resetBtn"),

  introCard: document.getElementById("introCard"),
  captureTarget: document.getElementById("captureTarget"),
  exportTarget: document.getElementById("exportTarget"),
  portraitFrame: document.getElementById("portraitFrame"),
  previewImage: document.getElementById("previewImage"),

  previewUsername: document.getElementById("previewUsername"),
  previewAge: document.getElementById("previewAge"),
  previewFub: document.getElementById("previewFub"),
  previewGameOwned: document.getElementById("previewGameOwned"),
  previewCreation: document.getElementById("previewCreation"),
  previewTweet: document.getElementById("previewTweet"),
  previewFavorite: document.getElementById("previewFavorite"),
  previewPairing: document.getElementById("previewPairing"),
  previewOneLine: document.getElementById("previewOneLine"),

  themeBadge: document.getElementById("themeBadge"),
  errorCapture: document.getElementById("errorCapture"),
  errorTitleText: document.getElementById("errorTitleText"),
  errorReasonText: document.getElementById("errorReasonText"),
  bottomTime: document.getElementById("bottomTime")
};

function getTextValue(input, fallback = "") {
  const value = input?.value?.trim() || "";
  return value || fallback;
}

function getCheckedValues(groupId) {
  const group = document.getElementById(groupId);
  if (!group) return [];

  return [...group.querySelectorAll('input[type="checkbox"]:checked')]
    .map((item) => item.value.trim())
    .filter(Boolean);
}

function getCombinedValues(groupId, freeInputId) {
  const checkedValues = getCheckedValues(groupId);
  const freeValue = (document.getElementById(freeInputId)?.value || "").trim();
  const values = [...checkedValues];

  if (freeValue) values.push(freeValue);

  return values.length ? values.join(" / ") : "";
}

function applyTheme(themeKey) {
  const data = themeData[themeKey];
  if (!data || !el.body || !el.introCard) return;

  el.body.classList.remove(
    "theme-system-page",
    "theme-ion-page",
    "theme-bo-page",
    "theme-grid-page",
    "theme-fix-page",
    "theme-debug-page",
      "theme-float-page"
  );

  el.introCard.classList.remove(
    "theme-system",
    "theme-ion",
    "theme-bo",
    "theme-grid",
    "theme-fix",
    "theme-debug",
      "theme-float"
  );

  el.body.classList.add(data.pageClass);
  el.introCard.classList.add(data.cardClass);

  if (el.themeBadge) {
    el.themeBadge.textContent = data.theme;
  }
}

function applyCardData() {
  if (el.previewUsername) {
    el.previewUsername.textContent = getTextValue(el.username, "@nickname");
  }
  if (el.previewAge) {
    el.previewAge.textContent = getTextValue(el.age, "20↑");
  }
  if (el.previewFub) {
    el.previewFub.textContent = getTextValue(el.fubfree, "FUB FREE");
  }
  if (el.previewGameOwned) {
    el.previewGameOwned.textContent = getTextValue(el.gameOwned, "O");
  }
  if (el.previewCreation) {
    el.previewCreation.textContent = getCombinedValues("creationGroup", "creationFree");
  }
  if (el.previewTweet) {
    el.previewTweet.textContent = getCombinedValues("tweetGroup", "tweetFree");
  }
  if (el.previewFavorite) {
    el.previewFavorite.textContent = getTextValue(el.favorite);
  }
  if (el.previewPairing) {
    el.previewPairing.textContent = getTextValue(el.pairing);
  }
  if (el.previewOneLine) {
    el.previewOneLine.textContent = getTextValue(el.oneLine, "잘 부탁드립니다!");
  }
  if (el.previewHate) {
    el.previewHate.textContent = getTextValue(el.hateFree);
  }
  if (el.theme) {
    applyTheme(el.theme.value);
  }
}

function updateCurrentTime() {
  if (!el.bottomTime) return;

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  el.bottomTime.textContent = `${hours}:${minutes}`;
}

function resetPortrait() {
  if (el.previewImage) {
    el.previewImage.src = EMPTY_IMAGE;
  }
  el.portraitFrame?.classList.remove("has-image");
}

function resetFormData() {
  if (el.theme) el.theme.value = "system";
  if (el.username) el.username.value = "";
  if (el.age) el.age.value = "20↑";
  if (el.fubfree) el.fubfree.value = "";
  if (el.gameOwned) el.gameOwned.value = "O";
  if (el.favorite) el.favorite.value = "";
  if (el.pairing) el.pairing.value = "";
  if (el.oneLine) el.oneLine.value = "";
  if (el.creationFree) el.creationFree.value = "";
  if (el.tweetFree) el.tweetFree.value = "";
  if (el.hateFree) el.hateFree.value = "";

  document
    .querySelectorAll('#creationGroup input[type="checkbox"], #tweetGroup input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.checked = false;
    });

  if (el.profileUpload) {
    el.profileUpload.value = "";
  }

  resetPortrait();
  applyCardData();
}

function handleProfileUpload(event) {
  const file = event.target.files?.[0];
  if (!file) {
    resetPortrait();
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const imageUrl = reader.result;

    if (!imageUrl || typeof imageUrl !== "string") {
      resetPortrait();
      return;
    }

    const img = new Image();

    img.onload = () => {
      if (el.previewImage) {
        el.previewImage.src = imageUrl;
      }
      el.portraitFrame?.classList.add("has-image");
    };

    img.onerror = () => {
      resetPortrait();
    };

    img.src = imageUrl;
  };

  reader.onerror = () => {
    resetPortrait();
  };

  reader.readAsDataURL(file);
}

async function waitForPreviewImage() {
  if (!el.previewImage) return;
  if (!el.portraitFrame?.classList.contains("has-image")) return;
  if (!el.previewImage.src) return;

  if (!el.previewImage.complete) {
    await new Promise((resolve) => {
      const done = () => resolve();
      el.previewImage.onload = done;
      el.previewImage.onerror = done;
    });
  }

  if (el.previewImage.decode) {
    try {
      await el.previewImage.decode();
    } catch (error) {
      // 무시
    }
  }
}

function getSaveBlockReason() {
  const isMinor = el.age?.value === "20↓";
  const notOwned = el.gameOwned?.value === "X";

  if (isMinor && notOwned) return "minor-and-unowned";
  if (isMinor) return "minor";
  if (notOwned) return "unowned";

  return null;
}

function updateErrorMessage(reason) {
  if (!el.errorTitleText || !el.errorReasonText) return;

  if (reason === "minor-and-unowned") {
    el.errorTitleText.textContent = "접근 권한이 없는 데이터입니다.";
    el.errorReasonText.textContent =
      "※ 위니언 바이러스는 성인 게임이며, 게임 구매 후 이용해주세요.";
    return;
  }

  if (reason === "minor") {
    el.errorTitleText.textContent = "접근 권한이 없는 데이터입니다.";
    el.errorReasonText.textContent =
      "※ 위니언 바이러스는 성인 게임입니다.";
    return;
  }

  if (reason === "unowned") {
    el.errorTitleText.textContent = "접근 권한이 없는 데이터입니다.";
    el.errorReasonText.textContent =
      "※ 위니언 바이러스 게임 구매 후 이용해주세요.";
    return;
  }

  el.errorTitleText.textContent = "접근 권한이 없는 데이터입니다.";
  el.errorReasonText.textContent = "※ 시스템 확인이 필요합니다.";
}

function normalizeErrorMessage(error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  if (error && typeof error === "object") {
    try {
      const text = JSON.stringify(error);
      if (text && text !== "{}") return text;
    } catch (e) {
      // 무시
    }
  }

  return "원인을 알 수 없는 오류가 발생했습니다.";
}

async function waitForStableLayout() {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;

    // ⭐ 이 한 줄 추가
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  await waitForPreviewImage();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => setTimeout(resolve, 160));
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function makeBlobFromTarget(target, options = {}) {
  if (!window.htmlToImage || typeof window.htmlToImage.toBlob !== "function") {
    throw new Error("html-to-image 라이브러리가 로드되지 않았습니다.");
  }

  const width = target.scrollWidth || target.offsetWidth;
  const height = target.scrollHeight || target.offsetHeight;

  return await window.htmlToImage.toBlob(target, {
    cacheBust: true,
    pixelRatio: options.pixelRatio ?? 2,
    backgroundColor: options.backgroundColor ?? null,
    width,
    height,
    canvasWidth: width * (options.pixelRatio ?? 2),
    canvasHeight: height * (options.pixelRatio ?? 2),
    skipAutoScale: true,
    style: {
      margin: "0",
    }
  });
}

async function tryCreateBlob(target) {
  let blob = null;
  let lastError = null;

  try {
    blob = await makeBlobFromTarget(target, {
      pixelRatio: 2,
      backgroundColor: null
    });
    if (blob) return blob;
  } catch (error) {
    lastError = error;
  }

  try {
    blob = await makeBlobFromTarget(target, {
      pixelRatio: 1,
      backgroundColor: "#00000000"
    });
    if (blob) return blob;
  } catch (error) {
    lastError = error;
  }

  throw lastError || new Error("이미지 Blob 생성에 실패했습니다.");
}

async function saveCardImage() {
  applyCardData();

  const blockReason = getSaveBlockReason();
  const shouldShowError = Boolean(blockReason);

  if (shouldShowError && el.errorCapture) {
    updateErrorMessage(blockReason);
    el.errorCapture.classList.remove("hidden");
  }


  try {
    await waitForStableLayout();

    const primaryTarget = shouldShowError ? el.errorCapture : el.captureTarget;
    const fallbackTarget = shouldShowError ? null : el.exportTarget;

    if (!primaryTarget) {
      throw new Error("저장 대상 요소를 찾을 수 없습니다.");
    }

    let blob = null;

    try {
      blob = await tryCreateBlob(primaryTarget);
    } catch (primaryError) {
      if (fallbackTarget) {
        blob = await tryCreateBlob(fallbackTarget);
      } else {
        throw primaryError;
      }
    }

    if (!blob) {
      throw new Error("이미지 Blob 생성에 실패했습니다.");
    }

    downloadBlob(
      blob,
      shouldShowError ? "winion_virus_error.png" : "winion_intro_card.png"
    );
  } catch (error) {
    const message = normalizeErrorMessage(error);
    console.error("저장 실패:", error);
    alert(`이미지 저장 중 오류가 발생했습니다.\n\n${message}`);
  } finally {


    if (shouldShowError && el.errorCapture) {
      el.errorCapture.classList.add("hidden");
    }
  }
}

if (el.profileUpload) {
  el.profileUpload.addEventListener("change", handleProfileUpload);
}

[
  el.theme,
  el.username,
  el.age,
  el.fubfree,
  el.gameOwned,
  el.favorite,
  el.pairing,
  el.oneLine,
  el.creationFree,
  el.tweetFree,
  el.hateFree
].forEach((input) => {
  if (!input) return;
  input.addEventListener("input", applyCardData);
  input.addEventListener("change", applyCardData);
});

document
  .querySelectorAll("#creationGroup input, #tweetGroup input")
  .forEach((checkbox) => {
    checkbox.addEventListener("change", applyCardData);
  });

if (el.saveBtn) {
  el.saveBtn.addEventListener("click", saveCardImage);
}

if (el.resetBtn) {
  el.resetBtn.addEventListener("click", resetFormData);
}

resetPortrait();
updateCurrentTime();
setInterval(updateCurrentTime, 30000);
applyCardData();