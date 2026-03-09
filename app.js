(() => {
  const COUNTER_NAMESPACE = "kroq86.github.io";
  const COUNTER_KEY = "action-copilot-landing";
  const VIEW_ACTION = "view";
  const LIKE_ACTION = "vote";
  const LIKE_LOCK_KEY = "action_copilot_liked";

  const likeButton = document.getElementById("like-button");
  const messageNode = document.getElementById("like-message");
  const viewsNode = document.getElementById("views-count");
  const likesNode = document.getElementById("likes-count");
  const withoutLikeNode = document.getElementById("without-like-count");

  if (!likeButton || !messageNode || !viewsNode || !likesNode || !withoutLikeNode) return;

  const setMessage = (text, type) => {
    messageNode.textContent = text;
    messageNode.classList.remove("ok", "error");
    if (type) messageNode.classList.add(type);
  };

  const render = (views, likes) => {
    const viewsNum = Number(views) || 0;
    const likesNum = Number(likes) || 0;
    const withoutLike = Math.max(0, viewsNum - likesNum);
    viewsNode.textContent = String(viewsNum);
    likesNode.textContent = String(likesNum);
    withoutLikeNode.textContent = String(withoutLike);
  };

  const buildCounterUrl = (action, readOnly) => {
    const suffix = readOnly ? "?readOnly=true" : "";
    return `https://counterapi.com/api/${COUNTER_NAMESPACE}/${action}/${COUNTER_KEY}${suffix}`;
  };

  const apiRead = async (action) => {
    const response = await fetch(buildCounterUrl(action, true));
    if (!response.ok) throw new Error(`READ ${action} failed (${response.status})`);
    return response.json();
  };

  const apiHit = async (action) => {
    const response = await fetch(buildCounterUrl(action, false));
    if (!response.ok) throw new Error(`HIT ${action} failed (${response.status})`);
    return response.json();
  };

  const refreshRemote = async () => {
    const [viewsRes, likesRes] = await Promise.all([apiRead(VIEW_ACTION), apiRead(LIKE_ACTION)]);
    render(viewsRes.value || 0, likesRes.value || 0);
  };

  const applyLikeLock = () => {
    const alreadyLiked = localStorage.getItem(LIKE_LOCK_KEY) === "1";
    if (alreadyLiked) {
      likeButton.disabled = true;
      likeButton.textContent = "👍 Already liked";
      setMessage("This browser already sent a like.", "ok");
    }
  };

  const bootstrap = async () => {
    try {
      await apiHit(VIEW_ACTION);
      await refreshRemote();
      setMessage("Counters updated.", "ok");
    } catch (error) {
      setMessage("Global counter is temporarily unavailable.", "error");
      console.error(error);
    }

    applyLikeLock();
  };

  likeButton.addEventListener("click", async () => {
    if (localStorage.getItem(LIKE_LOCK_KEY) === "1") {
      setMessage("This browser already sent a like.", "ok");
      return;
    }

    localStorage.setItem(LIKE_LOCK_KEY, "1");
    likeButton.disabled = true;
    likeButton.textContent = "👍 Already liked";

    try {
      await apiHit(LIKE_ACTION);
      await refreshRemote();
      setMessage("Like counted.", "ok");
    } catch (error) {
      setMessage("Could not count like. Global counter is temporarily unavailable.", "error");
      console.error(error);
    }
  });

  bootstrap();
})();
