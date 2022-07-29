const container = document.querySelector(".container");

const createChart = async function () {
  const resp = await fetch("./data.json");
  const data = [...(await resp.json())];

  const d = new Date();
  let day = d.toDateString().slice(0, 3).toLowerCase();

  const markup = `
  <div class="spending-container">
    <h1 class="spending-text">Spending - Last 7 days</h1>

    <div class="spending-chart-box">
    
    ${data
      .map(
        (data) => `
          <div class="spending-chart">
            <button class="spending-perc-table ${
              data.day === day ? "cyan-bg" : ""
            }" style="height: ${((data.amount * 100) / 227.94) * 5}px;">

            <span class="spending-table-amount">$${data.amount}</span>
            </button>


      <p class="spending-day">${data.day}</p>
      </div>
      `
      )
      .join("")}
    </div>

    <div class="spending-info">
      <div class="spending-info-text">
        <p class="spending-total">Total this month</p>

        <h3 class="spending-total-amount">$478.33</h3>
      </div>

      <div class="spending-lastm-info">
        <p class="spending-lastm-perc">+2.4%</p>
        <p class="spending-lastm-text">from last month</p>
      </div>
    </div>
  </div>
`;

  container.insertAdjacentHTML("beforeend", markup);
};

createChart();
