/* ============================================================
   FinFlow Pro — app.js
   Features: Auth, Dark Mode, AI Chat, Budgets, Smart Insights,
   Recurring Tx, MoM Comparison, PDF Export, Debounce, Multi-Currency
============================================================ */

// ── USERS ────────────────────────────────────────────────────
const USERS = {
  "admin@finflow.in":  { password: "admin123", name: "Arun Kumar",  initials: "AK", role: "admin"  },
  "viewer@finflow.in": { password: "viewer123", name: "Priya Mehta", initials: "PM", role: "viewer" },
};

// ── CATEGORY CONFIG ───────────────────────────────────────────
const CATEGORY_CONFIG = {
  "Salary":        { emoji: "💼", color: "#3B82F6", bg: "#DBEAFE" },
  "Freelance":     { emoji: "💻", color: "#8B5CF6", bg: "#EDE9FE" },
  "Food & Dining": { emoji: "🍽️", color: "#F59E0B", bg: "#FEF3C7" },
  "Transport":     { emoji: "🚗", color: "#06B6D4", bg: "#CFFAFE" },
  "Shopping":      { emoji: "🛍️", color: "#EC4899", bg: "#FCE7F3" },
  "Entertainment": { emoji: "🎭", color: "#A855F7", bg: "#F3E8FF" },
  "Healthcare":    { emoji: "🏥", color: "#EF4444", bg: "#FEE2E2" },
  "Utilities":     { emoji: "⚡", color: "#F97316", bg: "#FFEDD5" },
  "Housing":       { emoji: "🏠", color: "#14B8A6", bg: "#CCFBF1" },
  "Investment":    { emoji: "📈", color: "#10B981", bg: "#D1FAE5" },
  "Other":         { emoji: "📦", color: "#64748B", bg: "#F1F5F9" },
};

const EXPENSE_CATEGORIES = ["Food & Dining","Transport","Shopping","Entertainment","Healthcare","Utilities","Housing","Investment","Other"];
const INCOME_CATEGORIES  = ["Salary","Freelance","Other"];

// ── CURRENCY ──────────────────────────────────────────────────
const CURRENCY_RATES = { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0094 };
const CURRENCY_SYMBOLS = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };

// ── SEED DATA ─────────────────────────────────────────────────
const SEED_DATA = [
  { id:1,  date:"2025-11-05", desc:"November Salary",       category:"Salary",        type:"income",  amount:85000, recurring:true },
  { id:2,  date:"2025-11-07", desc:"Grocery - BigBasket",   category:"Food & Dining", type:"expense", amount:3200, recurring:false },
  { id:3,  date:"2025-11-10", desc:"Electricity Bill",      category:"Utilities",     type:"expense", amount:1800, recurring:true },
  { id:4,  date:"2025-11-12", desc:"Ola Cab",               category:"Transport",     type:"expense", amount:450,  recurring:false },
  { id:5,  date:"2025-11-14", desc:"Amazon Shopping",       category:"Shopping",      type:"expense", amount:5600, recurring:false },
  { id:6,  date:"2025-11-15", desc:"Freelance Project",     category:"Freelance",     type:"income",  amount:22000,recurring:false },
  { id:7,  date:"2025-11-17", desc:"Movie Tickets",         category:"Entertainment", type:"expense", amount:900,  recurring:false },
  { id:8,  date:"2025-11-18", desc:"Doctor Visit",          category:"Healthcare",    type:"expense", amount:1500, recurring:false },
  { id:9,  date:"2025-11-20", desc:"Restaurant - Zomato",   category:"Food & Dining", type:"expense", amount:1200, recurring:false },
  { id:10, date:"2025-11-22", desc:"Internet Bill",         category:"Utilities",     type:"expense", amount:999,  recurring:true },
  { id:11, date:"2025-11-25", desc:"SIP Investment",        category:"Investment",    type:"expense", amount:10000,recurring:true },
  { id:12, date:"2025-11-28", desc:"Rent",                  category:"Housing",       type:"expense", amount:20000,recurring:true },
  { id:13, date:"2025-12-02", desc:"December Salary",       category:"Salary",        type:"income",  amount:85000,recurring:true },
  { id:14, date:"2025-12-04", desc:"Grocery - Swiggy",      category:"Food & Dining", type:"expense", amount:2800, recurring:false },
  { id:15, date:"2025-12-07", desc:"Bus/Metro Pass",        category:"Transport",     type:"expense", amount:600,  recurring:true },
  { id:16, date:"2025-12-09", desc:"Myntra Sale",           category:"Shopping",      type:"expense", amount:3400, recurring:false },
  { id:17, date:"2025-12-12", desc:"Freelance Work",        category:"Freelance",     type:"income",  amount:15000,recurring:false },
  { id:18, date:"2025-12-14", desc:"Electricity Bill",      category:"Utilities",     type:"expense", amount:2100, recurring:true },
  { id:19, date:"2025-12-16", desc:"Concert Tickets",       category:"Entertainment", type:"expense", amount:2000, recurring:false },
  { id:20, date:"2025-12-18", desc:"Pharmacy",              category:"Healthcare",    type:"expense", amount:760,  recurring:false },
  { id:21, date:"2025-12-20", desc:"Restaurant - Dine Out", category:"Food & Dining", type:"expense", amount:2400, recurring:false },
  { id:22, date:"2025-12-22", desc:"Petrol",                category:"Transport",     type:"expense", amount:1200, recurring:false },
  { id:23, date:"2025-12-25", desc:"Rent",                  category:"Housing",       type:"expense", amount:20000,recurring:true },
  { id:24, date:"2025-12-28", desc:"SIP Investment",        category:"Investment",    type:"expense", amount:10000,recurring:true },
  { id:25, date:"2026-01-02", desc:"January Salary",        category:"Salary",        type:"income",  amount:90000,recurring:true },
  { id:26, date:"2026-01-05", desc:"Grocery",               category:"Food & Dining", type:"expense", amount:3100, recurring:false },
  { id:27, date:"2026-01-07", desc:"Bike Service",          category:"Transport",     type:"expense", amount:1800, recurring:false },
  { id:28, date:"2026-01-09", desc:"Flipkart Order",        category:"Shopping",      type:"expense", amount:4200, recurring:false },
  { id:29, date:"2026-01-12", desc:"Freelance Payout",      category:"Freelance",     type:"income",  amount:18000,recurring:false },
  { id:30, date:"2026-01-14", desc:"Water Bill",            category:"Utilities",     type:"expense", amount:400,  recurring:true },
  { id:31, date:"2026-01-16", desc:"Gym Membership",        category:"Entertainment", type:"expense", amount:2500, recurring:true },
  { id:32, date:"2026-01-18", desc:"Dental Checkup",        category:"Healthcare",    type:"expense", amount:1200, recurring:false },
  { id:33, date:"2026-01-20", desc:"Swiggy",                category:"Food & Dining", type:"expense", amount:850,  recurring:false },
  { id:34, date:"2026-01-22", desc:"Petrol",                category:"Transport",     type:"expense", amount:1400, recurring:false },
  { id:35, date:"2026-01-25", desc:"Rent",                  category:"Housing",       type:"expense", amount:20000,recurring:true },
  { id:36, date:"2026-01-28", desc:"SIP Investment",        category:"Investment",    type:"expense", amount:10000,recurring:true },
  { id:37, date:"2026-02-01", desc:"February Salary",       category:"Salary",        type:"income",  amount:90000,recurring:true },
  { id:38, date:"2026-02-04", desc:"Grocery",               category:"Food & Dining", type:"expense", amount:2900, recurring:false },
  { id:39, date:"2026-02-06", desc:"Ola Cab",               category:"Transport",     type:"expense", amount:600,  recurring:false },
  { id:40, date:"2026-02-08", desc:"Valentine Dinner",      category:"Food & Dining", type:"expense", amount:3200, recurring:false },
  { id:41, date:"2026-02-10", desc:"Shopping - Ajio",       category:"Shopping",      type:"expense", amount:2800, recurring:false },
  { id:42, date:"2026-02-13", desc:"Freelance",             category:"Freelance",     type:"income",  amount:25000,recurring:false },
  { id:43, date:"2026-02-15", desc:"Electricity Bill",      category:"Utilities",     type:"expense", amount:1650, recurring:true },
  { id:44, date:"2026-02-18", desc:"Netflix + Hotstar",     category:"Entertainment", type:"expense", amount:800,  recurring:true },
  { id:45, date:"2026-02-20", desc:"Health Insurance",      category:"Healthcare",    type:"expense", amount:5000, recurring:true },
  { id:46, date:"2026-02-22", desc:"Swiggy Grocery",        category:"Food & Dining", type:"expense", amount:1500, recurring:false },
  { id:47, date:"2026-02-25", desc:"Rent",                  category:"Housing",       type:"expense", amount:20000,recurring:true },
  { id:48, date:"2026-02-27", desc:"SIP Investment",        category:"Investment",    type:"expense", amount:10000,recurring:true },
  { id:49, date:"2026-03-01", desc:"March Salary",          category:"Salary",        type:"income",  amount:90000,recurring:true },
  { id:50, date:"2026-03-03", desc:"Grocery",               category:"Food & Dining", type:"expense", amount:2750, recurring:false },
  { id:51, date:"2026-03-05", desc:"Petrol",                category:"Transport",     type:"expense", amount:1600, recurring:false },
  { id:52, date:"2026-03-07", desc:"Annual Conference",     category:"Other",         type:"expense", amount:4000, recurring:false },
  { id:53, date:"2026-03-10", desc:"Freelance Payment",     category:"Freelance",     type:"income",  amount:30000,recurring:false },
  { id:54, date:"2026-03-12", desc:"Amazon",                category:"Shopping",      type:"expense", amount:6800, recurring:false },
  { id:55, date:"2026-03-15", desc:"Phone Bill",            category:"Utilities",     type:"expense", amount:799,  recurring:true },
  { id:56, date:"2026-03-18", desc:"Badminton Court",       category:"Entertainment", type:"expense", amount:600,  recurring:false },
  { id:57, date:"2026-03-20", desc:"Doctor Visit",          category:"Healthcare",    type:"expense", amount:900,  recurring:false },
  { id:58, date:"2026-03-22", desc:"Zomato",                category:"Food & Dining", type:"expense", amount:1100, recurring:false },
  { id:59, date:"2026-03-25", desc:"Rent",                  category:"Housing",       type:"expense", amount:20000,recurring:true },
  { id:60, date:"2026-03-28", desc:"SIP Investment",        category:"Investment",    type:"expense", amount:10000,recurring:true },
  { id:61, date:"2026-04-01", desc:"April Salary",          category:"Salary",        type:"income",  amount:92000,recurring:true },
  { id:62, date:"2026-04-03", desc:"Grocery",               category:"Food & Dining", type:"expense", amount:2650, recurring:false },
  { id:63, date:"2026-04-04", desc:"Metro Card",            category:"Transport",     type:"expense", amount:500,  recurring:false },
];

// ── DEFAULT BUDGETS ──────────────────────────────────────────
const DEFAULT_BUDGETS = {
  "Food & Dining": 8000,
  "Transport":     4000,
  "Shopping":      6000,
  "Entertainment": 3000,
  "Utilities":     3500,
  "Housing":       22000,
};

// ── STATE ─────────────────────────────────────────────────────
let state = {
  transactions: [],
  filters: { search:"", type:"", category:"", sort:"date-desc", dateFrom:"", dateTo:"" },
  currentPage: 1,
  pageSize: 10,
  editId: null,
  nextId: 200,
  balanceTrendChart: null,
  categoryChart: null,
  monthlyChart: null,
  currency: "INR",
  budgets: {},
  currentUser: null,
  aiHistory: [],
};

// ── INIT ──────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  const saved = localStorage.getItem("finflow_session");
  if (saved) {
    try {
      state.currentUser = JSON.parse(saved);
      showApp();
    } catch { showLogin(); }
  } else { showLogin(); }
});

function showLogin() {
  document.getElementById("loginScreen").style.display = "flex";
  document.getElementById("appShell").classList.add("hidden");
}

function showApp() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("appShell").classList.remove("hidden");
  initApp();
}

function initApp() {
  const user = state.currentUser;
  document.getElementById("sidebarAvatar").textContent = user.initials;
  document.getElementById("sidebarName").textContent   = user.name;
  document.getElementById("userRoleBadge").textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
  document.getElementById("welcomeMsg").textContent    = `Welcome back, ${user.name.split(" ")[0]}. Here's your financial snapshot.`;

  loadStorage();
  document.getElementById("currentDate").textContent = new Date().toLocaleDateString("en-IN", { weekday:"short", year:"numeric", month:"short", day:"numeric" });
  document.getElementById("formDate").value = new Date().toISOString().split("T")[0];
  syncCategoryOptions();
  initCategoryFilter();
  updateRoleUI();
  renderAll();

  // Nav
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      switchSection(item.dataset.section);
    });
  });

  // Dark mode sync
  const isDark = localStorage.getItem("finflow_dark") === "true";
  if (isDark) document.getElementById("dmToggle").classList.add("on");

  // Currency
  const savedCur = localStorage.getItem("finflow_currency") || "INR";
  state.currency = savedCur;
  document.getElementById("currencySelect").value = savedCur;
}

function doLogin() {
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const pass  = document.getElementById("loginPassword").value;
  const user  = USERS[email];
  const errEl = document.getElementById("loginError");

  if (!user || user.password !== pass) {
    errEl.classList.remove("hidden");
    return;
  }
  errEl.classList.add("hidden");
  state.currentUser = { email, name: user.name, initials: user.initials, role: user.role };
  localStorage.setItem("finflow_session", JSON.stringify(state.currentUser));
  showApp();
}

function doLogout() {
  localStorage.removeItem("finflow_session");
  state.currentUser = null;
  state.balanceTrendChart?.destroy();
  state.categoryChart?.destroy();
  state.monthlyChart?.destroy();
  state.balanceTrendChart = null;
  state.categoryChart = null;
  state.monthlyChart = null;
  document.getElementById("aiMessages").innerHTML = "";
  showLogin();
}

function fillDemo(email, pass) {
  document.getElementById("loginEmail").value    = email;
  document.getElementById("loginPassword").value = pass;
}

// ── STORAGE ───────────────────────────────────────────────────
function loadStorage() {
  try {
    const key = `finflow_txns_${state.currentUser.email}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      state.transactions = JSON.parse(saved);
      state.nextId = Math.max(...state.transactions.map(t => t.id), 100) + 1;
    } else {
      state.transactions = SEED_DATA.map(t => ({...t}));
      state.nextId = 200;
    }
    const budgetKey = `finflow_budgets_${state.currentUser.email}`;
    const savedBudgets = localStorage.getItem(budgetKey);
    state.budgets = savedBudgets ? JSON.parse(savedBudgets) : {...DEFAULT_BUDGETS};
  } catch {
    state.transactions = SEED_DATA.map(t => ({...t}));
    state.nextId = 200;
    state.budgets = {...DEFAULT_BUDGETS};
  }
}

function saveStorage() {
  const key = `finflow_txns_${state.currentUser.email}`;
  localStorage.setItem(key, JSON.stringify(state.transactions));
  const budgetKey = `finflow_budgets_${state.currentUser.email}`;
  localStorage.setItem(budgetKey, JSON.stringify(state.budgets));
}

// ── DARK MODE ─────────────────────────────────────────────────
function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("finflow_dark", !isDark);
  document.getElementById("dmToggle").classList.toggle("on", !isDark);
  renderCharts();
}

function applyTheme() {
  const isDark = localStorage.getItem("finflow_dark") === "true";
  if (isDark) document.documentElement.setAttribute("data-theme", "dark");
}

// ── CURRENCY ──────────────────────────────────────────────────
function changeCurrency(cur) {
  state.currency = cur;
  localStorage.setItem("finflow_currency", cur);
  renderAll();
}

function fmt(n) {
  const sym = CURRENCY_SYMBOLS[state.currency] || "₹";
  const rate = CURRENCY_RATES[state.currency] || 1;
  const val = Math.abs(n) * rate;
  if (state.currency === "INR") {
    return sym + val.toLocaleString("en-IN", { maximumFractionDigits: 0 });
  }
  return sym + val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ── ROLE ──────────────────────────────────────────────────────
function updateRoleUI() {
  const isAdmin = state.currentUser?.role === "admin";
  document.querySelectorAll(".admin-only").forEach(el => el.classList.toggle("hidden", !isAdmin));
}

// ── RENDER ALL ────────────────────────────────────────────────
function renderAll() {
  renderSummaryCards();
  renderSmartInsights();
  renderRecentTransactions();
  renderTransactionsTable();
  renderCharts();
  renderInsights();
  renderInsightsTable();
  renderBudgets();
  renderRecurring();
}

// ── MONTHLY HELPERS ───────────────────────────────────────────
function getMonthKey(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
}

function getCurrentMonthKey() {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`;
}

function getPrevMonthKey() {
  const n = new Date();
  n.setMonth(n.getMonth()-1);
  return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`;
}

function getTxnsByMonth(monthKey) {
  return state.transactions.filter(t => getMonthKey(t.date) === monthKey);
}

function sumType(txns, type) {
  return txns.filter(t => t.type === type).reduce((s,t) => s + t.amount, 0);
}

// ── SUMMARY CARDS ─────────────────────────────────────────────
function renderSummaryCards() {
  const curM = getCurrentMonthKey();
  const prevM = getPrevMonthKey();
  const curTxns  = getTxnsByMonth(curM);
  const prevTxns = getTxnsByMonth(prevM);

  const income  = sumType(curTxns, "income");
  const expense = sumType(curTxns, "expense");
  const prevIncome  = sumType(prevTxns, "income");
  const prevExpense = sumType(prevTxns, "expense");
  const balance = state.transactions.reduce((s,t) => t.type==="income" ? s+t.amount : s-t.amount, 0);
  const savings = income > 0 ? Math.max(0, ((income - expense) / income * 100)) : 0;

  document.getElementById("totalBalance").textContent = fmt(balance);
  document.getElementById("totalIncome").textContent  = fmt(income);
  document.getElementById("totalExpense").textContent = fmt(expense);
  document.getElementById("savingsRate").textContent  = savings.toFixed(1) + "%";

  // Changes
  const setChange = (elId, cur, prev) => {
    const el = document.getElementById(elId);
    if (!prev) return;
    const pct = ((cur - prev) / prev * 100);
    el.textContent = (pct >= 0 ? "↑" : "↓") + " " + Math.abs(pct).toFixed(1) + "% from last month";
    el.parentElement.className = "card-change " + (pct >= 0 ? "positive" : "negative");
  };
  setChange("balanceChange",  income - expense, prevIncome - prevExpense);
  setChange("incomeChange",   income, prevIncome);
  setChange("expenseChange",  expense, prevExpense);

  const diff = savings - (prevIncome > 0 ? Math.max(0,(prevIncome-prevExpense)/prevIncome*100) : savings);
  document.getElementById("savingsDesc").textContent = (diff >= 0 ? "↑ +" : "↓ ") + Math.abs(diff).toFixed(1) + "% vs last month";
  document.getElementById("savingsDesc").parentElement.className = "card-change " + (diff >= 0 ? "positive" : "negative");
}

// ── SMART INSIGHTS BAR ────────────────────────────────────────
function renderSmartInsights() {
  const bar = document.getElementById("smartInsightsBar");
  const curM  = getCurrentMonthKey();
  const prevM = getPrevMonthKey();
  const curTxns  = getTxnsByMonth(curM);
  const prevTxns = getTxnsByMonth(prevM);

  const curExp   = sumType(curTxns, "expense");
  const prevExp  = sumType(prevTxns, "expense");
  const curInc   = sumType(curTxns, "income");
  const prevInc  = sumType(prevTxns, "income");

  const pills = [];

  // Month-on-month expense comparison
  if (prevExp > 0) {
    const pct = ((curExp - prevExp) / prevExp * 100);
    if (pct > 10) {
      pills.push({ icon:"⚠️", text:`Spending up ${pct.toFixed(0)}% vs last month`, cls:"warn" });
    } else if (pct < -10) {
      pills.push({ icon:"✅", text:`Spending down ${Math.abs(pct).toFixed(0)}% vs last month`, cls:"good" });
    }
  }

  // Category overspend
  const catSpend = {};
  curTxns.filter(t => t.type === "expense").forEach(t => {
    catSpend[t.category] = (catSpend[t.category]||0) + t.amount;
  });
  Object.entries(state.budgets).forEach(([cat, limit]) => {
    const spent = catSpend[cat] || 0;
    if (spent > limit) {
      pills.push({ icon:"🔴", text:`${cat} budget exceeded by ${fmt(spent - limit)}`, cls:"warn" });
    } else if (spent > limit * 0.8) {
      pills.push({ icon:"🟡", text:`${cat} at ${Math.round(spent/limit*100)}% of budget`, cls:"warn" });
    }
  });

  // Savings rate
  const savingRate = curInc > 0 ? (curInc - curExp) / curInc * 100 : 0;
  if (savingRate > 30) {
    pills.push({ icon:"🏆", text:`Savings rate ${savingRate.toFixed(0)}% — excellent!`, cls:"good" });
  }

  // Top category
  const topCat = Object.entries(catSpend).sort((a,b) => b[1]-a[1])[0];
  if (topCat) {
    pills.push({ icon: CATEGORY_CONFIG[topCat[0]]?.emoji||"📦", text:`${topCat[0]} is your top spend: ${fmt(topCat[1])}`, cls:"info" });
  }

  if (!pills.length) pills.push({ icon:"💡", text:"Add more transactions to see smart insights", cls:"info" });

  bar.innerHTML = pills.map(p => `
    <div class="smart-pill ${p.cls}">
      <span class="pill-icon">${p.icon}</span>
      <span>${p.text}</span>
    </div>
  `).join("");
}

// ── RECENT TRANSACTIONS ───────────────────────────────────────
function renderRecentTransactions() {
  const recent = [...state.transactions]
    .sort((a,b) => b.date.localeCompare(a.date)).slice(0, 6);
  const el = document.getElementById("recentTransactions");
  if (!recent.length) { el.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:.85rem;">No transactions yet.</div>`; return; }
  el.innerHTML = recent.map(t => {
    const cfg = CATEGORY_CONFIG[t.category] || CATEGORY_CONFIG["Other"];
    return `<div class="txn-item">
      <div class="txn-cat-icon" style="background:${cfg.bg};color:${cfg.color}">${cfg.emoji}</div>
      <div class="txn-info">
        <div class="txn-desc">${escHtml(t.desc)}${t.recurring ? ' <span class="recurring-badge">↻ Recurring</span>' : ""}</div>
        <div class="txn-meta">${formatDate(t.date)} · ${t.category}</div>
      </div>
      <div class="txn-amount ${t.type}">${t.type === "income" ? "+" : "-"}${fmt(t.amount)}</div>
    </div>`;
  }).join("");
}

// ── TRANSACTIONS TABLE ────────────────────────────────────────
let _debounceTimer;
function debouncedFilter() {
  clearTimeout(_debounceTimer);
  _debounceTimer = setTimeout(filterTransactions, 280);
}

function filterTransactions() {
  state.filters.search   = document.getElementById("searchInput").value.trim().toLowerCase();
  state.filters.type     = document.getElementById("filterType").value;
  state.filters.category = document.getElementById("filterCategory").value;
  state.filters.sort     = document.getElementById("sortBy").value;
  state.filters.dateFrom = document.getElementById("filterDateFrom").value;
  state.filters.dateTo   = document.getElementById("filterDateTo").value;
  state.currentPage = 1;
  renderTransactionsTable();
}

function getFilteredTxns() {
  let txns = [...state.transactions];
  const {search, type, category, sort, dateFrom, dateTo} = state.filters;
  if (search)   txns = txns.filter(t => t.desc.toLowerCase().includes(search) || t.category.toLowerCase().includes(search));
  if (type)     txns = txns.filter(t => t.type === type);
  if (category) txns = txns.filter(t => t.category === category);
  if (dateFrom) txns = txns.filter(t => t.date >= dateFrom);
  if (dateTo)   txns = txns.filter(t => t.date <= dateTo);
  const [field, dir] = sort.split("-");
  txns.sort((a,b) => {
    if (field === "date")   return dir === "desc" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
    if (field === "amount") return dir === "desc" ? b.amount - a.amount : a.amount - b.amount;
    return 0;
  });
  return txns;
}

function renderTransactionsTable() {
  const isAdmin = state.currentUser?.role === "admin";
  const filtered = getFilteredTxns();
  const total = filtered.length;
  const pages = Math.ceil(total / state.pageSize);
  const start = (state.currentPage - 1) * state.pageSize;
  const page  = filtered.slice(start, start + state.pageSize);

  // Stats
  const incomeTotal   = filtered.filter(t => t.type==="income").reduce((s,t) => s+t.amount, 0);
  const expenseTotal  = filtered.filter(t => t.type==="expense").reduce((s,t) => s+t.amount, 0);
  document.getElementById("txnStats").innerHTML = `
    <span>Showing <b>${total}</b> transactions</span>
    <span>Income: <b style="color:#059669">${fmt(incomeTotal)}</b></span>
    <span>Expenses: <b style="color:var(--rose)">${fmt(expenseTotal)}</b></span>
  `;

  const tbody = document.getElementById("transactionsBody");
  const empty = document.getElementById("emptyState");

  if (!page.length) {
    tbody.innerHTML = "";
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");
    tbody.innerHTML = page.map(t => {
      const cfg = CATEGORY_CONFIG[t.category] || CATEGORY_CONFIG["Other"];
      return `<tr>
        <td>${formatDate(t.date)}</td>
        <td><span style="font-weight:500">${escHtml(t.desc)}</span>${t.recurring ? ' <span class="recurring-badge">↻</span>' : ""}</td>
        <td><span class="category-tag" style="background:${cfg.bg};color:${cfg.color}">${cfg.emoji} ${escHtml(t.category)}</span></td>
        <td><span class="type-badge ${t.type}">${t.type === "income" ? "↑ Income" : "↓ Expense"}</span></td>
        <td style="text-align:right;font-family:var(--font-display);font-weight:700;color:${t.type==="income"?"#059669":"var(--text-primary)"}">${t.type==="income"?"+":"-"}${fmt(t.amount)}</td>
        ${isAdmin ? `<td><div class="action-btns">
          <button class="action-btn" onclick="editTransaction(${t.id})" title="Edit">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="action-btn delete" onclick="deleteTransaction(${t.id})" title="Delete">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
          </button>
        </div></td>` : `<td class="admin-only hidden"></td>`}
      </tr>`;
    }).join("");
  }

  // Pagination
  const pag = document.getElementById("pagination");
  if (pages <= 1) { pag.innerHTML = ""; return; }
  const cur = state.currentPage;
  let btns = `<span class="pagination-info">Page ${cur} of ${pages}</span><div class="pagination-btns">`;
  btns += `<button class="page-btn" onclick="goPage(${cur-1})" ${cur===1?"disabled":""}>‹</button>`;
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || (i >= cur-1 && i <= cur+1)) {
      btns += `<button class="page-btn ${i===cur?"active":""}" onclick="goPage(${i})">${i}</button>`;
    } else if (i === cur-2 || i === cur+2) {
      btns += `<button class="page-btn" disabled>…</button>`;
    }
  }
  btns += `<button class="page-btn" onclick="goPage(${cur+1})" ${cur===pages?"disabled":""}>›</button></div>`;
  pag.innerHTML = btns;
}

function goPage(p) {
  state.currentPage = p;
  renderTransactionsTable();
}

function toggleSort(field) {
  const [f, d] = state.filters.sort.split("-");
  state.filters.sort = field === f ? `${field}-${d==="desc"?"asc":"desc"}` : `${field}-desc`;
  document.getElementById("sortBy").value = state.filters.sort;
  state.currentPage = 1;
  renderTransactionsTable();
}

function clearFilters() {
  document.getElementById("searchInput").value   = "";
  document.getElementById("filterType").value    = "";
  document.getElementById("filterCategory").value= "";
  document.getElementById("sortBy").value        = "date-desc";
  document.getElementById("filterDateFrom").value= "";
  document.getElementById("filterDateTo").value  = "";
  state.filters = { search:"", type:"", category:"", sort:"date-desc", dateFrom:"", dateTo:"" };
  state.currentPage = 1;
  renderTransactionsTable();
}

function initCategoryFilter() {
  const sel = document.getElementById("filterCategory");
  sel.innerHTML = `<option value="">All Categories</option>`;
  Object.keys(CATEGORY_CONFIG).forEach(c => {
    sel.innerHTML += `<option value="${c}">${c}</option>`;
  });
}

// ── CHARTS ────────────────────────────────────────────────────
let chartPeriod = "6m";

function switchChartPeriod(p, btn) {
  chartPeriod = p;
  document.querySelectorAll(".chart-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  renderCharts();
}

function getChartTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  return {
    grid:  isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
    text:  isDark ? "#8B949E" : "#94A3B8",
    bg:    isDark ? "#1C2333" : "#FFFFFF",
  };
}

function renderCharts() {
  renderBalanceTrend();
  renderCategoryChart();
  renderMonthlyChart();
}

function renderBalanceTrend() {
  const months = getLast6Months();
  const count = chartPeriod === "3m" ? 3 : 6;
  const subset = months.slice(-count);
  const theme = getChartTheme();

  let runningBalance = 0;
  const allMonths = months.map(m => {
    const txns = getTxnsByMonth(m.key);
    const inc = sumType(txns, "income");
    const exp = sumType(txns, "expense");
    runningBalance += (inc - exp);
    return runningBalance;
  });

  const data = allMonths.slice(-count);
  const labels = subset.map(m => m.label);

  const ctx = document.getElementById("balanceTrendChart");
  if (state.balanceTrendChart) state.balanceTrendChart.destroy();

  state.balanceTrendChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Balance",
        data: data.map(v => Math.round(v * CURRENCY_RATES[state.currency])),
        borderColor: "#10B981",
        backgroundColor: "rgba(16,185,129,0.08)",
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => fmt(ctx.raw / (CURRENCY_RATES[state.currency]||1)) } } },
      scales: {
        x: { grid: { color: theme.grid }, ticks: { color: theme.text, font: { family: "Plus Jakarta Sans", size: 11 } } },
        y: { grid: { color: theme.grid }, ticks: { color: theme.text, font: { family: "Plus Jakarta Sans", size: 11 }, callback: v => fmt(v / (CURRENCY_RATES[state.currency]||1)) } }
      }
    }
  });
}

function renderCategoryChart() {
  const curM = getCurrentMonthKey();
  const curTxns = getTxnsByMonth(curM).filter(t => t.type === "expense");
  const spend = {};
  curTxns.forEach(t => spend[t.category] = (spend[t.category]||0) + t.amount);
  const sorted = Object.entries(spend).sort((a,b) => b[1]-a[1]).slice(0, 6);

  const total = sorted.reduce((s,[,v]) => s+v, 0);
  document.getElementById("donutTotal").textContent = fmt(total);

  const ctx = document.getElementById("categoryChart");
  if (state.categoryChart) state.categoryChart.destroy();

  state.categoryChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: sorted.map(([k]) => k),
      datasets: [{
        data: sorted.map(([,v]) => v),
        backgroundColor: sorted.map(([k]) => CATEGORY_CONFIG[k]?.color || "#64748B"),
        borderWidth: 2,
        borderColor: getChartTheme().bg,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: "70%",
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => `${ctx.label}: ${fmt(ctx.raw)}` } } }
    }
  });

  // Legend
  document.getElementById("categoryLegend").innerHTML = sorted.map(([cat, val]) => {
    const cfg = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG["Other"];
    return `<div class="legend-item">
      <span class="legend-dot" style="background:${cfg.color}"></span>
      <span class="legend-label">${cat}</span>
      <span class="legend-val">${fmt(val)}</span>
    </div>`;
  }).join("");
}

function renderMonthlyChart() {
  const months = getLast6Months();
  const theme = getChartTheme();
  const ctx = document.getElementById("monthlyComparisonChart");
  if (state.monthlyChart) state.monthlyChart.destroy();

  state.monthlyChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: months.map(m => m.label),
      datasets: [
        { label:"Income",   data: months.map(m => sumType(getTxnsByMonth(m.key),"income")),  backgroundColor:"rgba(16,185,129,0.75)", borderRadius:6 },
        { label:"Expenses", data: months.map(m => sumType(getTxnsByMonth(m.key),"expense")), backgroundColor:"rgba(244,63,94,0.65)", borderRadius:6 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: theme.text, font: { family:"Plus Jakarta Sans", size:11 } } }, tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${fmt(ctx.raw)}` } } },
      scales: {
        x: { grid: { color: theme.grid }, ticks: { color: theme.text, font: { family:"Plus Jakarta Sans", size:11 } } },
        y: { grid: { color: theme.grid }, ticks: { color: theme.text, font: { family:"Plus Jakarta Sans", size:11 }, callback: v => fmt(v) } }
      }
    }
  });
}

function getLast6Months() {
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setDate(1); d.setMonth(d.getMonth() - i);
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,
      label: d.toLocaleDateString("en-IN", { month:"short", year:"2-digit" })
    });
  }
  return months;
}

// ── INSIGHTS ──────────────────────────────────────────────────
function renderInsights() {
  const curM  = getCurrentMonthKey();
  const prevM = getPrevMonthKey();
  const curTxns  = getTxnsByMonth(curM);
  const curInc   = sumType(curTxns, "income");
  const curExp   = sumType(curTxns, "expense");

  // Highest category
  const catSpend = {};
  curTxns.filter(t => t.type==="expense").forEach(t => catSpend[t.category] = (catSpend[t.category]||0)+t.amount);
  const topCat = Object.entries(catSpend).sort((a,b)=>b[1]-a[1])[0];
  document.getElementById("highestCategory").textContent = topCat ? topCat[0] : "—";
  document.getElementById("highestCategoryAmt").textContent = topCat ? fmt(topCat[1]) + " this month" : "—";

  // Best saving month
  const months = getLast6Months();
  let bestM = null, bestSav = -Infinity;
  months.forEach(m => {
    const txns = getTxnsByMonth(m.key);
    const sav = sumType(txns,"income") - sumType(txns,"expense");
    if (sav > bestSav) { bestSav = sav; bestM = m; }
  });
  document.getElementById("bestSavingMonth").textContent = bestM ? bestM.label : "—";
  document.getElementById("bestSavingDesc").textContent  = bestM && bestSav > 0 ? `Saved ${fmt(bestSav)}` : "—";

  // Avg daily spend
  const today = new Date();
  const dayOfMonth = today.getDate();
  document.getElementById("avgDailySpend").textContent = dayOfMonth > 0 ? fmt(curExp / dayOfMonth) + "/day" : "—";

  // Budget utilization
  document.getElementById("budgetUtil").textContent = curInc > 0 ? (curExp / curInc * 100).toFixed(0) + "%" : "—";

  // MoM insights
  renderMomInsights(curM, prevM);
}

function renderMomInsights(curM, prevM) {
  const curTxns  = getTxnsByMonth(curM);
  const prevTxns = getTxnsByMonth(prevM);
  const curCat  = {};
  const prevCat = {};
  curTxns.filter(t=>t.type==="expense").forEach(t=>curCat[t.category]=(curCat[t.category]||0)+t.amount);
  prevTxns.filter(t=>t.type==="expense").forEach(t=>prevCat[t.category]=(prevCat[t.category]||0)+t.amount);

  const pills = Object.keys({...curCat, ...prevCat}).map(cat => {
    const cur  = curCat[cat]  || 0;
    const prev = prevCat[cat] || 0;
    if (!prev) return null;
    const pct = ((cur - prev) / prev * 100);
    const cls = Math.abs(pct) < 5 ? "neutral" : pct > 0 ? "up" : "down";
    const arrow = pct > 0 ? "↑" : "↓";
    const cfg = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG["Other"];
    return `<div class="mom-pill ${cls}">${cfg.emoji} ${cat}: ${arrow}${Math.abs(pct).toFixed(0)}%</div>`;
  }).filter(Boolean);

  const el = document.getElementById("momInsights");
  el.innerHTML = `<div class="mom-header">📊 Month-on-Month Changes</div><div class="mom-pills">${pills.join("") || '<span style="color:var(--text-muted);font-size:.85rem">Not enough data for comparison</span>'}</div>`;
}

// ── INSIGHTS TABLE ────────────────────────────────────────────
function renderInsightsTable() {
  const curM  = getCurrentMonthKey();
  const prevM = getPrevMonthKey();
  const curTxns  = state.transactions.filter(t => t.type==="expense");
  const prevTxns = getTxnsByMonth(prevM).filter(t => t.type==="expense");
  const total = curTxns.reduce((s,t) => s+t.amount, 0);

  const cats = {};
  curTxns.forEach(t => {
    if (!cats[t.category]) cats[t.category] = {count:0, total:0};
    cats[t.category].count++;
    cats[t.category].total += t.amount;
  });

  const prevCats = {};
  prevTxns.forEach(t => { prevCats[t.category] = (prevCats[t.category]||0) + t.amount; });

  const rows = Object.entries(cats).sort((a,b) => b[1].total - a[1].total);
  const cfg = CATEGORY_CONFIG;

  document.getElementById("insightsTableBody").innerHTML = rows.map(([cat, d]) => {
    const prev = prevCats[cat] || 0;
    const pct  = total ? (d.total / total * 100) : 0;
    const color = cfg[cat]?.color || "#64748B";
    let momHtml = "—";
    if (prev > 0) {
      const delta = ((d.total - prev) / prev * 100);
      momHtml = `<span class="mom-delta ${delta>0?"up":"down"}">${delta>0?"↑":"↓"}${Math.abs(delta).toFixed(0)}%</span>`;
    }
    return `<tr>
      <td><span style="display:flex;align-items:center;gap:7px;font-weight:500">${cfg[cat]?.emoji||"📦"} ${cat}</span></td>
      <td>${d.count}</td>
      <td style="font-family:var(--font-display);font-weight:700">${fmt(d.total)}</td>
      <td>${fmt(d.total / d.count)}</td>
      <td>${momHtml}</td>
      <td><div class="share-bar-wrapper"><div class="share-bar-bg"><div class="share-bar-fill" style="width:${pct}%;background:${color}"></div></div><span style="font-size:.72rem;color:var(--text-muted)">${pct.toFixed(0)}%</span></div></td>
    </tr>`;
  }).join("");
}

// ── BUDGETS ───────────────────────────────────────────────────
function renderBudgets() {
  const curM   = getCurrentMonthKey();
  const curTxns = getTxnsByMonth(curM).filter(t => t.type === "expense");
  const spend  = {};
  curTxns.forEach(t => spend[t.category] = (spend[t.category]||0) + t.amount);

  const budgets = state.budgets;
  const entries = Object.entries(budgets);

  const totalBudget  = entries.reduce((s,[,v]) => s+v, 0);
  const totalSpent   = entries.reduce((s,[k]) => s+(spend[k]||0), 0);
  const totalRemain  = totalBudget - totalSpent;
  const overCats     = entries.filter(([k]) => (spend[k]||0) > budgets[k]).length;

  document.getElementById("budgetSummaryRow").innerHTML = `
    <div class="budget-summary-card">
      <div class="bsc-label">Total Monthly Budget</div>
      <div class="bsc-val">${fmt(totalBudget)}</div>
      <div class="bsc-sub">across ${entries.length} categories</div>
    </div>
    <div class="budget-summary-card">
      <div class="bsc-label">Spent This Month</div>
      <div class="bsc-val" style="color:${totalSpent > totalBudget ? "var(--rose)" : "var(--text-primary)"}">${fmt(totalSpent)}</div>
      <div class="bsc-sub">${(totalSpent/totalBudget*100).toFixed(0)}% of budget used</div>
    </div>
    <div class="budget-summary-card">
      <div class="bsc-label">Remaining</div>
      <div class="bsc-val" style="color:${totalRemain < 0 ? "var(--rose)" : "#059669"}">${fmt(Math.abs(totalRemain))}</div>
      <div class="bsc-sub">${overCats > 0 ? `⚠ ${overCats} categories over budget` : "✅ All categories on track"}</div>
    </div>
  `;

  const isAdmin = state.currentUser?.role === "admin";
  const grid = document.getElementById("budgetsGrid");

  if (!entries.length) {
    grid.innerHTML = `<div class="no-budget-card"><p style="font-size:1.5rem;margin-bottom:8px">🎯</p><p>No budgets set yet.</p>${isAdmin ? '<p>Click "Set Budget" to get started.</p>' : ""}</div>`;
    return;
  }

  grid.innerHTML = entries.map(([cat, limit]) => {
    const spent = spend[cat] || 0;
    const pct   = Math.min(limit > 0 ? (spent / limit * 100) : 0, 100);
    const cls   = pct > 100 ? "over" : pct > 80 ? "warn" : "ok";
    const remain = limit - spent;
    const cfg   = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG["Other"];
    return `<div class="budget-card">
      <div class="budget-card-header">
        <div class="budget-cat">
          <span class="budget-cat-icon">${cfg.emoji}</span>
          <span class="budget-cat-name">${cat}</span>
        </div>
        <div class="budget-amounts">
          <div class="budget-spent">${fmt(spent)}</div>
          <div class="budget-limit">of ${fmt(limit)}</div>
        </div>
        ${isAdmin ? `<button class="budget-edit-btn" onclick="openBudgetModal('${cat}')">✏️</button>` : ""}
      </div>
      <div class="budget-bar-bg">
        <div class="budget-bar-fill ${cls}" style="width:${pct}%"></div>
      </div>
      <div class="budget-footer">
        <span class="budget-pct ${cls}">${pct.toFixed(0)}% used</span>
        <span class="budget-remaining">${remain >= 0 ? fmt(remain) + " left" : fmt(Math.abs(remain)) + " over"}</span>
      </div>
    </div>`;
  }).join("");
}

function openBudgetModal(cat) {
  document.getElementById("budgetCategory").value = cat || "Food & Dining";
  document.getElementById("budgetAmount").value   = cat ? (state.budgets[cat] || "") : "";
  document.getElementById("budgetModalOverlay").classList.remove("hidden");
}

function closeBudgetModal(e) {
  if (e.target === document.getElementById("budgetModalOverlay")) closeBudgetModalDirect();
}

function closeBudgetModalDirect() { document.getElementById("budgetModalOverlay").classList.add("hidden"); }

function saveBudget() {
  const cat = document.getElementById("budgetCategory").value;
  const amt = parseFloat(document.getElementById("budgetAmount").value);
  if (!cat || !amt || amt <= 0) { showToast("Enter a valid budget amount", "error"); return; }
  state.budgets[cat] = amt;
  saveStorage();
  closeBudgetModalDirect();
  renderBudgets();
  renderSmartInsights();
  showToast(`Budget set for ${cat} ✓`, "success");
}

// ── RECURRING TRANSACTIONS ───────────────────────────────────
function renderRecurring() {
  const recurring = state.transactions.filter(t => t.recurring);
  const el = document.getElementById("recurringList");
  if (!recurring.length) {
    el.innerHTML = `<div style="padding:20px;color:var(--text-muted);font-size:.85rem;text-align:center">No recurring transactions found. Mark transactions as recurring when adding.</div>`;
    return;
  }
  // Dedupe by desc + category
  const seen = new Set();
  const unique = recurring.filter(t => {
    const key = `${t.desc}_${t.category}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0,9);

  el.innerHTML = unique.map(t => {
    const cfg = CATEGORY_CONFIG[t.category] || CATEGORY_CONFIG["Other"];
    return `<div class="recurring-item">
      <span class="rec-icon">${cfg.emoji}</span>
      <div class="rec-info">
        <div class="rec-desc">${escHtml(t.desc)}</div>
        <div class="rec-meta">${t.category} · Monthly</div>
      </div>
      <div class="rec-amt">${fmt(t.amount)}</div>
    </div>`;
  }).join("");
}

// ── MODAL ─────────────────────────────────────────────────────
function syncCategoryOptions() {
  const type = document.getElementById("formType").value;
  const cats = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const sel  = document.getElementById("formCategory");
  sel.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join("");
}

function openModal(editId = null) {
  state.editId = editId;
  document.getElementById("modalTitle").textContent = editId ? "Edit Transaction" : "Add Transaction";
  if (editId) {
    const t = state.transactions.find(tx => tx.id === editId);
    if (t) {
      document.getElementById("formType").value      = t.type;
      syncCategoryOptions();
      document.getElementById("formDesc").value      = t.desc;
      document.getElementById("formAmount").value    = t.amount;
      document.getElementById("formCategory").value  = t.category;
      document.getElementById("formDate").value      = t.date;
      document.getElementById("formRecurring").checked = !!t.recurring;
    }
  } else {
    document.getElementById("formType").value    = "expense";
    syncCategoryOptions();
    document.getElementById("formDesc").value    = "";
    document.getElementById("formAmount").value  = "";
    document.getElementById("formDate").value    = new Date().toISOString().split("T")[0];
    document.getElementById("formRecurring").checked = false;
  }
  document.getElementById("modalOverlay").classList.remove("hidden");
}

function closeModal(e) { if (e.target === document.getElementById("modalOverlay")) closeModalDirect(); }

function closeModalDirect() {
  document.getElementById("modalOverlay").classList.add("hidden");
  state.editId = null;
}

function saveTransaction() {
  const desc      = document.getElementById("formDesc").value.trim();
  const amount    = parseFloat(document.getElementById("formAmount").value);
  const type      = document.getElementById("formType").value;
  const category  = document.getElementById("formCategory").value;
  const date      = document.getElementById("formDate").value;
  const recurring = document.getElementById("formRecurring").checked;

  if (!desc)                  { showToast("Please enter a description", "error"); return; }
  if (!amount || amount <= 0) { showToast("Please enter a valid amount > 0", "error"); return; }
  if (!date)                  { showToast("Please select a date", "error"); return; }

  if (state.editId) {
    const idx = state.transactions.findIndex(t => t.id === state.editId);
    if (idx > -1) state.transactions[idx] = { ...state.transactions[idx], desc, amount, type, category, date, recurring };
    showToast("Transaction updated ✓", "success");
  } else {
    state.transactions.push({ id: state.nextId++, desc, amount, type, category, date, recurring });
    showToast("Transaction added ✓", "success");
  }
  saveStorage();
  closeModalDirect();
  renderAll();
}

function editTransaction(id) { openModal(id); }

function deleteTransaction(id) {
  if (!confirm("Delete this transaction?")) return;
  state.transactions = state.transactions.filter(t => t.id !== id);
  saveStorage();
  renderAll();
  showToast("Transaction deleted", "");
}

// ── NAVIGATION ────────────────────────────────────────────────
function switchSection(name) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  document.getElementById(`section-${name}`).classList.add("active");
  document.querySelector(`[data-section="${name}"]`).classList.add("active");
  if (window.innerWidth < 900) toggleSidebar(false);
  if (name === "insights" || name === "overview") setTimeout(renderCharts, 50);
}

function toggleSidebar(forceState) {
  const sidebar  = document.getElementById("sidebar");
  const overlay  = document.getElementById("sidebarOverlay");
  const isOpen   = sidebar.classList.contains("open");
  const open     = forceState !== undefined ? forceState : !isOpen;
  sidebar.classList.toggle("open", open);
  overlay.classList.toggle("open", open);
}

// ── EXPORT ────────────────────────────────────────────────────
function toggleExportMenu() {
  document.getElementById("exportDropdown").classList.toggle("hidden");
}

document.addEventListener("click", e => {
  if (!e.target.closest(".export-menu-wrap")) {
    document.getElementById("exportDropdown")?.classList.add("hidden");
  }
});

function exportData(format) {
  const txns = state.transactions;
  if (!txns.length) { showToast("No data to export", "error"); return; }

  if (format === "pdf") {
    exportPDF();
    return;
  }

  let content, filename, type;
  if (format === "csv") {
    const headers = ["ID","Date","Description","Category","Type","Amount","Recurring"];
    const rows = txns.map(t => [t.id, t.date, `"${t.desc}"`, t.category, t.type, t.amount, t.recurring?"Yes":"No"]);
    content = [headers, ...rows].map(r => r.join(",")).join("\n");
    filename = "finflow-transactions.csv"; type = "text/csv";
  } else {
    content = JSON.stringify({ exported: new Date().toISOString(), user: state.currentUser?.name, transactions: txns }, null, 2);
    filename = "finflow-transactions.json"; type = "application/json";
  }

  const blob = new Blob([content], { type });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  showToast(`Exported as ${format.toUpperCase()} ✓`, "success");
}

function exportPDF() {
  const curM    = getCurrentMonthKey();
  const curTxns = getTxnsByMonth(curM);
  const income  = sumType(curTxns, "income");
  const expense = sumType(curTxns, "expense");
  const savings = income - expense;
  const month   = new Date().toLocaleDateString("en-IN", { month:"long", year:"numeric" });

  const win = window.open("", "_blank");
  win.document.write(`<!DOCTYPE html><html><head><title>FinFlow Report - ${month}</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #1e293b; }
    h1 { color: #0f172a; border-bottom: 3px solid #10B981; padding-bottom: 12px; }
    .stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin: 24px 0; }
    .stat { background: #f8fafc; border-radius: 10px; padding: 16px; text-align: center; }
    .stat-label { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: #64748b; margin-bottom: 6px; }
    .stat-val { font-size: 22px; font-weight: 700; color: #0f172a; }
    .green { color: #059669; } .red { color: #e11d48; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
    th { background: #f1f5f9; padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: #64748b; }
    td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
    tr:hover td { background: #f8fafc; }
    .footer { margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center; }
  </style></head><body>
  <h1>FinFlow Monthly Report</h1>
  <p style="color:#64748b">${month} · Generated ${new Date().toLocaleString("en-IN")}</p>
  <div class="stats">
    <div class="stat"><div class="stat-label">Income</div><div class="stat-val green">${fmt(income)}</div></div>
    <div class="stat"><div class="stat-label">Expenses</div><div class="stat-val red">${fmt(expense)}</div></div>
    <div class="stat"><div class="stat-label">Net Savings</div><div class="stat-val ${savings>=0?"green":"red"}">${fmt(savings)}</div></div>
  </div>
  <h2 style="font-size:16px;margin-bottom:8px">Transactions</h2>
  <table>
    <thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Type</th><th style="text-align:right">Amount</th></tr></thead>
    <tbody>
    ${curTxns.map(t => `<tr>
      <td>${formatDate(t.date)}</td>
      <td>${escHtml(t.desc)}</td>
      <td>${t.category}</td>
      <td>${t.type}</td>
      <td style="text-align:right;font-weight:600;color:${t.type==="income"?"#059669":"#1e293b"}">${t.type==="income"?"+":"-"}${fmt(t.amount)}</td>
    </tr>`).join("")}
    </tbody>
  </table>
  <div class="footer">FinFlow Pro · Confidential Financial Report</div>
  <script>window.print();<\/script>
  </body></html>`);
  win.document.close();
  showToast("PDF report generated ✓", "success");
}

// ── AI ASSISTANT ──────────────────────────────────────────────
function sendAiChip(el) {
  document.getElementById("aiInput").value = el.textContent;
  sendAiMessage();
}

async function sendAiMessage() {
  const input = document.getElementById("aiInput");
  const msg   = input.value.trim();
  if (!msg) return;
  input.value = "";

  appendAiMsg("user", msg);

  // Build context summary
  const curM   = getCurrentMonthKey();
  const prevM  = getPrevMonthKey();
  const curT   = getTxnsByMonth(curM);
  const prevT  = getTxnsByMonth(prevM);
  const curInc = sumType(curT, "income"), curExp = sumType(curT, "expense");
  const prevInc= sumType(prevT,"income"), prevExp= sumType(prevT,"expense");

  const catSpend = {};
  curT.filter(t=>t.type==="expense").forEach(t => catSpend[t.category] = (catSpend[t.category]||0)+t.amount);
  const catSummary = Object.entries(catSpend).map(([k,v])=>`${k}: ₹${v}`).join(", ");
  const totalBalance = state.transactions.reduce((s,t) => t.type==="income"?s+t.amount:s-t.amount, 0);
  const budgetInfo = Object.entries(state.budgets).map(([k,v])=>`${k}: budget=₹${v}, spent=₹${catSpend[k]||0}`).join("; ");

  const allCatSpend = {};
  state.transactions.filter(t=>t.type==="expense").forEach(t => allCatSpend[t.category] = (allCatSpend[t.category]||0)+t.amount);
  const allCatSummary = Object.entries(allCatSpend).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${k}: ₹${v.toLocaleString()}`).join(", ");
  const recentTxns = [...state.transactions].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,10).map(t=>`${t.date} | ${t.desc} | ${t.category} | ${t.type} | ₹${t.amount}`).join("\n");

  const systemPrompt = `You are FinFlow AI, a smart and friendly personal finance assistant. Answer helpfully and clearly. Use bullet points or short paragraphs. Use ₹ for Indian Rupee amounts. Be specific with numbers from the data.

USER'S COMPLETE FINANCIAL DATA:
- Total balance (all time net): ₹${totalBalance.toLocaleString()}
- This month (${getCurrentMonthKey()}) income: ₹${curInc.toLocaleString()}, expenses: ₹${curExp.toLocaleString()}, net savings: ₹${(curInc-curExp).toLocaleString()}
- Last month income: ₹${prevInc.toLocaleString()}, expenses: ₹${prevExp.toLocaleString()}, net savings: ₹${(prevInc-prevExp).toLocaleString()}
- Savings rate this month: ${curInc > 0 ? ((curInc-curExp)/curInc*100).toFixed(1) : 0}%
- This month spending by category: ${catSummary || "no expenses yet"}
- All-time spending by category: ${allCatSummary || "no data"}
- Budget status: ${budgetInfo || "no budgets set"}

RECENT 10 TRANSACTIONS (date | description | category | type | amount):
${recentTxns || "no transactions"}

Answer the user's question using the above data. If they ask about food, look at Food & Dining category. Be actionable and give specific advice.`;

  // Show typing
  const typingId = "typing_" + Date.now();
  const messagesEl = document.getElementById("aiMessages");
  messagesEl.innerHTML += `<div class="ai-msg bot" id="${typingId}">
    <div class="bot-avatar">✨</div>
    <div class="msg-bubble"><div class="ai-typing"><div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div></div></div>
  </div>`;
  messagesEl.scrollTop = messagesEl.scrollHeight;

  try {
    const GEMINI_API_KEY = "AIzaSyBD7K709kRlUKnmW_2YKoanoKrvZ5y0Qdg";
    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt + "\n\nUser question: " + msg }] }],
        generationConfig: { maxOutputTokens: 1000, temperature: 0.7 }
      })
    });
    const data = await resp.json();
    if (!resp.ok) {
      const errMsg = data?.error?.message || `API error ${resp.status}`;
      document.getElementById(typingId)?.remove();
      appendAiMsg("bot", `⚠️ Error: ${errMsg}`);
      return;
    }
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";
    document.getElementById(typingId)?.remove();
    appendAiMsg("bot", text);
  } catch (err) {
    document.getElementById(typingId)?.remove();
    appendAiMsg("bot", `⚠️ Network error: ${err.message}`);
  }
}

function appendAiMsg(role, text) {
  const el = document.getElementById("aiMessages");
  const user = state.currentUser;
  if (role === "user") {
    el.innerHTML += `<div class="ai-msg user">
      <div class="msg-bubble">${escHtml(text)}</div>
      <div class="user-bubble-av">${user?.initials || "ME"}</div>
    </div>`;
  } else {
    el.innerHTML += `<div class="ai-msg bot">
      <div class="bot-avatar">✨</div>
      <div class="msg-bubble">${text.replace(/\n/g, "<br>")}</div>
    </div>`;
  }
  el.scrollTop = el.scrollHeight;
}

// ── TOAST ─────────────────────────────────────────────────────
let _toastTimer;
function showToast(msg, type = "") {
  const toast = document.getElementById("toast");
  const icons = { success:"✓", error:"✕", warn:"⚠" };
  toast.innerHTML = (icons[type] ? `<span>${icons[type]}</span>` : "") + escHtml(msg);
  toast.className = "toast" + (type ? ` ${type}` : "");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.add("hidden"), 3200);
}

// ── UTILS ─────────────────────────────────────────────────────
function escHtml(str) {
  if (typeof str !== "string") return "";
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });
}
