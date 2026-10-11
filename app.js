const tasks = [
  {
    id: 1,
    title: "《国家安全教育》线上课程",
    category: "学习任务",
    publishDate: "2026-10-08",
    period: "2026-09-14 00:00 – 2027-01-18 24:00",
    hasDDL: true,
    urgency: "低",
    link: "https://portal.shisu.edu.cn/…ext2=NEWS2026-09-300018",
  },
  {
    id: 2,
    title: "《大学生心理健康》线上课程",
    category: "学习任务",
    publishDate: "2026-10-08",
    period: "2026-09-29 00:00 – 2027-01-03 24:00",
    hasDDL: true,
    urgency: "低",
    link: "https://newoaa.shisu.edu.cn/3a/a0/c6353a211616/page.htm",
  },
  {
    id: 3,
    title: "Smile 校内一卡通教程 / CSS 练习资料",
    category: "学习任务",
    publishDate: "2026-10-10",
    period: "无明确截止",
    hasDDL: false,
    urgency: "低",
    link: "https://xingyezn.github.io/web-lab/#/lesson/css-01",
  },
  {
    id: 4,
    title: "指定性实践教学基地报名",
    category: "实践/实习",
    publishDate: "2026-10-08",
    period: "2026-10-11 09:00 – 10-12 21:00",
    hasDDL: true,
    urgency: "高",
    link: "（二维码见原文）",
  },
  {
    id: 5,
    title: "外交部考录宣讲会及报名",
    category: "招募/活动",
    publishDate: "2026-10-08",
    period: "宣讲 10-12；报名DDL 10-09 11:00",
    hasDDL: true,
    urgency: "高",
    link: "https://v.wjx.cn/vm/wMBNwV3.aspx#",
  },
  {
    id: 6,
    title: "模拟普通话测试志愿者招募",
    category: "招募/活动",
    publishDate: "2026-10-09",
    period: "2026-10-13 10:00 开始",
    hasDDL: true,
    urgency: "中",
    link: "https://docs.qq.com/form/page/DRmptdEdsZENJVXBO",
  },
  {
    id: 7,
    title: "Armageddon 迎新舞蹈招募",
    category: "招募/活动",
    publishDate: "2026-10-10",
    period: "报名截止 2026-10-14",
    hasDDL: true,
    urgency: "中",
    link: "",
  },
  {
    id: 8,
    title: "“赓续红色血脉”作品征集",
    category: "文娱/作品征集",
    publishDate: "2026-10-08",
    period: "时间未注明",
    hasDDL: false,
    urgency: "待定",
    link: "",
  },
  {
    id: 9,
    title: "AI@文 社团群招募",
    category: "社团兴趣",
    publishDate: "2026-10-10",
    period: "持续有效",
    hasDDL: false,
    urgency: "低",
    link: "",
  },
  {
    id: 10,
    title: "学院社实部志愿项目咨询",
    category: "志愿/公益",
    publishDate: "2026-10-10",
    period: "持续有效",
    hasDDL: false,
    urgency: "低",
    link: "",
  },
  {
    id: 11,
    title: "社保卡领取与激活通知",
    category: "学生服务",
    publishDate: "2026-10-08",
    period: "存量卡即日起；26级新生待通知",
    hasDDL: false,
    urgency: "中",
    link: "https://mp.weixin.qq.com/s?__biz=MzA3OTUyNTYyMg==…",
  },
  {
    id: 12,
    title: "学院周边文创领取补发",
    category: "学生服务",
    publishDate: "2026-10-08",
    period: "下周末左右到货，待通知",
    hasDDL: false,
    urgency: "低",
    link: "",
  },
  {
    id: 13,
    title: "寝室安全宣传员群加入",
    category: "安全提醒",
    publishDate: "2026-10-10",
    period: "尽快加入",
    hasDDL: false,
    urgency: "中",
    link: "",
  },
  {
    id: 14,
    title: "宿舍消防/安全用电提示",
    category: "安全提醒",
    publishDate: "2026-10-10",
    period: "长期提醒",
    hasDDL: false,
    urgency: "低",
    link: "https://mp.weixin.qq.com/s/MZN5SyOYQjDUS5M7Cbotfw",
  },
  {
    id: 15,
    title: "迎新·奔跑要点推文",
    category: "其他",
    publishDate: "2026-10-08",
    period: "迎新倒计时1天",
    hasDDL: false,
    urgency: "中",
    link: "https://mp.weixin.qq.com/s?__biz=MzA4NjUwNzAwMw==…",
  },
  {
    id: 16,
    title: "保健班申请表下载",
    category: "其他",
    publishDate: "2026-10-10",
    period: "时间未注明",
    hasDDL: false,
    urgency: "待定",
    link: "https://newoaa.shisu.edu.cn/",
  }
];

const state = {
  filterCategory: "all",
  searchKeyword: "",
  ddlFilter: "all",
  urgencyFilter: "all",
  completed: new Set(),
  reminderTarget: null
};

const cardGrid = document.getElementById("cardGrid");
const navButtons = document.querySelectorAll(".nav-btn");
const searchInput = document.getElementById("searchInput");
const ddlFilter = document.getElementById("ddlFilter");
const urgencyFilter = document.getElementById("urgencyFilter");
const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const doneCount = document.getElementById("doneCount");
const reminderModal = document.getElementById("reminderModal");
const modalTitle = document.getElementById("modalTitle");
const reminderSelect = document.getElementById("reminderSelect");
const saveReminder = document.getElementById("saveReminder");
const cancelReminder = document.getElementById("cancelReminder");

function render() {
  const filtered = tasks.filter(task => {
    if (state.filterCategory !== "all" && task.category !== state.filterCategory) return false;
    if (state.searchKeyword && !task.title.includes(state.searchKeyword)) return false;
    if (state.ddlFilter === "has" && !task.hasDDL) return false;
    if (state.ddlFilter === "none" && task.hasDDL) return false;
    if (state.urgencyFilter !== "all" && task.urgency !== state.urgencyFilter) return false;
    return true;
  });

  cardGrid.innerHTML = "";
  filtered.forEach(task => {
    const card = document.createElement("article");
    card.className = `card ${state.completed.has(task.id) ? "completed" : ""}`;
    const urgencyClass = {
      "高": "label-urgency-high",
      "中": "label-urgency-mid",
      "低": "label-urgency-low",
      "待定": "label-urgency-pending"
    }[task.urgency] || "label-urgency-low";

    card.innerHTML = `
      <div class="card-header">
        <h4>${task.title}</h4>
        <span class="label ${urgencyClass}">${task.urgency}</span>
      </div>
      <div class="labels">
        <span class="label label-category">${task.category}</span>
        ${task.hasDDL ? `<span class="label label-ddl">DDL</span>` : ""}
      </div>
      <div class="meta">
        <div>发布时间：${task.publishDate}</div>
        <div>截止/执行：${task.period}</div>
      </div>
      <div class="actions">
        <button class="btn-complete" data-id="${task.id}">
          ${state.completed.has(task.id) ? "撤销完成" : "标记完成"}
        </button>
        <button class="btn-reminder" data-id="${task.id}">🔔 提醒</button>
        ${task.link ? `<a class="btn-link" href="${task.link}" target="_blank" rel="noopener">来源</a>` : ""}
      </div>
    `;
    cardGrid.appendChild(card);
  });

  totalCount.textContent = tasks.length;
  doneCount.textContent = state.completed.size;
  pendingCount.textContent = tasks.length - state.completed.size;
}

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.filterCategory = btn.dataset.filter;
    render();
  });
});

searchInput.addEventListener("input", (e) => {
  state.searchKeyword = e.target.value.trim();
  render();
});
ddlFilter.addEventListener("change", (e) => {
  state.ddlFilter = e.target.value;
  render();
});
urgencyFilter.addEventListener("change", (e) => {
  state.urgencyFilter = e.target.value;
  render();
});

cardGrid.addEventListener("click", (e) => {
  if (e.target.matches(".btn-complete")) {
    const id = Number(e.target.dataset.id);
    if (state.completed.has(id)) state.completed.delete(id);
    else state.completed.add(id);
    render();
  }
  if (e.target.matches(".btn-reminder")) {
    const id = Number(e.target.dataset.id);
    state.reminderTarget = tasks.find(t => t.id === id);
    modalTitle.textContent = state.reminderTarget.title;
    reminderModal.classList.remove("hidden");
  }
});

saveReminder.addEventListener("click", () => {
  if (!state.reminderTarget) return;
  const minutes = reminderSelect.value;
  alert(`已为「${state.reminderTarget.title}」设置提前 ${minutes} 分钟提醒。实际项目可替换为浏览器通知/短信/邮件 API。`);
  reminderModal.classList.add("hidden");
  state.reminderTarget = null;
});
cancelReminder.addEventListener("click", () => {
  reminderModal.classList.add("hidden");
  state.reminderTarget = null;
});
reminderModal.addEventListener("click", (e) => {
  if (e.target === reminderModal) {
    reminderModal.classList.add("hidden");
    state.reminderTarget = null;
  }
});

render();