(() => {
  "use strict";
  const config = window.PERSONAL_SITE || {};
  const $ = (id) => document.getElementById(id);
  const username = config.githubUsername || "July-yh";

  function fill(id, value) {
    if (value && $(id)) $(id).textContent = value;
  }

  function profileUrl(name) {
    return `https://github.com/${encodeURIComponent(name)}`;
  }

  function setProfileLinks(name) {
    const url = profileUrl(name);
    ["topGitHub", "projectGitHub", "contactGitHub"].forEach((id) => { $(id).href = url; });
    $("contactGitHub").textContent = name;
  }

  function renderExperience(items) {
    if (!Array.isArray(items) || !items.length) return;
    const list = $("experienceList");
    list.replaceChildren();
    for (const item of items) {
      const row = document.createElement("li");
      const time = document.createElement("time");
      time.textContent = item.period || "";
      const detail = document.createElement("div");
      const heading = document.createElement("h3");
      heading.textContent = item.title || "";
      const description = document.createElement("p");
      description.textContent = item.description || "";
      detail.append(heading, description);
      row.append(time, detail);
      list.append(row);
    }
  }

  function renderProjects(repos, login) {
    const container = $("projectGroups");
    container.replaceChildren();
    const visible = Array.isArray(repos)
      ? repos.filter((repo) => !repo.fork && !repo.archived && !repo.private).slice(0, 12)
      : [];
    if (!visible.length) {
      $("projectsStatus").textContent = "目前没有可展示的公开项目。";
      return;
    }
    const groups = new Map();
    for (const repo of visible) {
      const year = repo.pushed_at ? new Date(repo.pushed_at).getFullYear() : "Projects";
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(repo);
    }
    for (const [year, items] of groups) {
      const heading = document.createElement("h3");
      heading.className = "post-year";
      heading.textContent = String(year);
      const list = document.createElement("ul");
      list.className = "posts";
      for (const repo of items) {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = `${profileUrl(login)}/${encodeURIComponent(repo.name)}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = repo.name;
        const description = document.createElement("small");
        const rawDescription = typeof repo.description === "string" ? repo.description.trim() : "";
        description.textContent = rawDescription && rawDescription.toLowerCase() !== "none"
          ? rawDescription
          : repo.name.toLowerCase() === "personality"
            ? "个人网站源码与设计迭代"
            : "GitHub 公开项目";
        item.append(link, description);
        list.append(item);
      }
      container.append(heading, list);
    }
    $("projectsStatus").hidden = true;
  }

  async function readGitHub() {
    try {
      const encoded = encodeURIComponent(username);
      const [profileResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${encoded}`, {headers: {Accept: "application/vnd.github+json"}}),
        fetch(`https://api.github.com/users/${encoded}/repos?type=owner&sort=updated&direction=desc&per_page=100`, {headers: {Accept: "application/vnd.github+json"}})
      ]);
      if (!profileResponse.ok || !reposResponse.ok) throw new Error("GitHub unavailable");
      const [profile, repos] = await Promise.all([profileResponse.json(), reposResponse.json()]);
      const login = profile.login || username;
      setProfileLinks(login);
      if (profile.avatar_url && /^https:\/\/avatars\.githubusercontent\.com\//.test(profile.avatar_url)) {
        $("portrait").src = profile.avatar_url;
        $("portrait").alt = `${config.name || profile.name || login} 的头像`;
        $("portrait").hidden = false;
        $("portraitFallback").hidden = true;
      }
      if (!config.name && profile.name) {
        fill("displayName", profile.name);
        document.title = `${profile.name} · Personal Website`;
      }
      if (!config.intro && profile.bio) fill("introLead", profile.bio);
      if (!config.location && profile.location) fill("locationValue", profile.location);
      renderProjects(repos, login);
    } catch (_) {
      $("projectsStatus").textContent = "暂时无法读取 GitHub 项目。可通过上方链接访问完整主页。";
    }
  }

  setProfileLinks(username);
  fill("displayName", config.name);
  if (config.name) document.title = `${config.name} · Personal Website`;
  if (config.nameChinese) {
    fill("chineseName", config.nameChinese);
    $("chineseName").hidden = false;
  }
  fill("introLead", config.intro);
  fill("introDetail", config.about);
  fill("researchText", config.focus);
  fill("writingText", config.writing);
  fill("locationValue", config.location);
  renderExperience(config.experience);
  if (config.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) {
    const link = document.createElement("a");
    link.href = `mailto:${config.email}`;
    link.textContent = config.email;
    $("emailValue").replaceChildren(link);
    $("emailValue").classList.remove("placeholder");
  }
  $("updatedDate").textContent = new Intl.DateTimeFormat("en", {month:"short",year:"numeric"}).format(new Date());
  readGitHub();
})();
