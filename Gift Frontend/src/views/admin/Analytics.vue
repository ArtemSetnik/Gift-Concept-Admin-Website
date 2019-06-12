<template>
  <div id="admin-analytics">
    <div class="vx-row">
      <div class="vx-col w-full lg:w-1/2 mb-base">
        <vx-card slot="no-body" class="text-center bg-gradient greet-user h-full">
          <img
            src="@/assets/images/elements/decore-left.png"
            class="decore-left"
            alt="Decore Left"
            width="200"
          >
          <img
            src="@/assets/images/elements/decore-right.png"
            class="decore-right"
            alt="Decore Right"
            width="175"
          >
          <feather-icon
            icon="UserIcon"
            class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow"
            svgClasses="h-8 w-8"
          ></feather-icon>
          <div class="vx-row">
            <div class="vx-col w-1/3">
              <div class="p-6 pb-0">
                <div>
                  <h2 class="mb-1 font-bold">300</h2>
                  <span>Registered Sellers</span>
                </div>
              </div>
            </div>
            <div class="vx-col w-1/3">
              <div class="p-6 pb-0">
                <div>
                  <h2 class="mb-1 font-bold">500</h2>
                  <span>Registered Drivers</span>
                </div>
              </div>
            </div>
            <div class="vx-col w-1/3">
              <div class="p-6 pb-0">
                <div>
                  <h2 class="mb-1 font-bold">32.6K</h2>
                  <span>Registered Buyers</span>
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          class="h-full"
          icon="ShoppingCartIcon"
          statistic="92.6k"
          statisticTitle="Buyer Orders"
          :chartData="analyticsData.subscribersGained"
          type="area"
        ></statistics-card-line>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          icon="CopyIcon"
          statistic="97.5K"
          statisticTitle="Driver Orders"
          :chartData="analyticsData.ordersRecevied"
          color="warning"
          type="area"
        ></statistics-card-line>
      </div>
    </div>

    <div class="vx-row">
      <!-- CARD 5: SUPPORT TRACKER -->
      <div class="vx-col w-full lg:w-1/3 md:w-1/2 sm:w-1/2 mb-base">
        <vx-card title="Browser Statistics" class="h-full">
          <div
            v-for="(browser, index) in analyticsData.browserAnalytics"
            :key="browser.id"
            :class="{'mt-4': index}"
          >
            <div class="flex justify-between">
              <div class="flex flex-col">
                <span class="mb-1">{{ browser.name }}</span>
                <h4>{{ browser.ratio }}%</h4>
              </div>
              <div class="flex flex-col text-right">
                <span class="flex -mr-1">
                  <span class="mr-1">{{ browser.comparedResult }}</span>
                  <feather-icon
                    :icon=" browser.comparedResult < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'"
                    :svgClasses="[browser.comparedResult < 0 ? 'text-danger' : 'text-success'  ,'stroke-current h-4 w-4 mb-1 mr-1']"
                  ></feather-icon>
                </span>
                <span class="text-grey">{{ browser.time | time(true) }}</span>
              </div>
            </div>
            <vs-progress :percent="browser.ratio"></vs-progress>
          </div>
        </vx-card>
      </div>

      <div class="vx-col w-full lg:w-1/3 md:w-1/2 sm:w-1/2 mb-base">
        <vx-card title="Sessions By Device">
          <!-- SLOT = ACTIONS -->
          <template slot="actions">
            <change-time-duration-dropdown/>
          </template>

          <div slot="no-body">
            <vue-apex-charts
              type="donut"
              height="325"
              :options="analyticsData.sessionsByDeviceDonut.chartOptions"
              :series="analyticsData.sessionsByDeviceDonut.series"
            />
          </div>

          <ul style="margin-top:-5rem;">
            <li
              v-for="deviceData in analyticsData.sessionsByDeviceDonut.analyticsData"
              :key="deviceData.device"
              class="flex mb-3"
            >
              <feather-icon
                :icon="deviceData.icon"
                :svgClasses="[`h-5 w-5 stroke-current text-${deviceData.color}`]"
              ></feather-icon>
              <span class="ml-2 inline-block font-semibold">{{ deviceData.device }}</span>
              <span class="mx-2">-</span>
              <span class="mr-4">{{ deviceData.sessionsPercentgae }}%</span>
              <div class="ml-auto flex -mr-1">
                <span class="mr-1">{{ deviceData.comparedResultPercentage }}%</span>
                <feather-icon
                  :icon=" deviceData.comparedResultPercentage < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'"
                  :svgClasses="[deviceData.comparedResultPercentage < 0 ? 'text-danger' : 'text-success'  ,'stroke-current h-4 w-4 mb-1 mr-1']"
                ></feather-icon>
              </div>
            </li>
          </ul>
        </vx-card>
      </div>

      <div class="vx-col w-full lg:w-1/3 mb-base">
        <vx-card title="Sales State" class="h-full">
          <!-- CARD ACTION -->
          <template slot="actions">
            <change-time-duration-dropdown/>
          </template>

          <div slot="no-body">
            <div class="vx-row text-center">
              <div class="vx-col sm:w-1/5 w-full flex flex-col justify-between mb-4">
                <div class="ml-6 mt-6">
                  <h1
                    class="font-bold text-5xl"
                  >{{ adminAnalyticsData.supportTrackerRadialBar.chartData.totalOrders }}</h1>
                  <small>Total Orders</small>
                </div>
              </div>
              <div class="vx-col sm:w-4/5 justify-center mx-auto">
                <vue-apex-charts
                  type="radialBar"
                  height="300"
                  :options="adminAnalyticsData.supportTrackerRadialBar.chartOptions"
                  :series="adminAnalyticsData.supportTrackerRadialBar.series"
                />
              </div>
            </div>
            <div class="flex flex-row justify-between px-8 pb-4">
              <p class="text-center">
                <span class="block">Pending Orders</span>
                <span
                  class="text-4xl"
                >{{ adminAnalyticsData.supportTrackerRadialBar.chartData.pendingOrders }}</span>
              </p>
              <p class="text-center">
                <span class="block">Driving Orders</span>
                <span
                  class="text-4xl"
                >{{ adminAnalyticsData.supportTrackerRadialBar.chartData.drivingOrders }}</span>
              </p>
              <p class="text-center">
                <span class="block">Completed Orders</span>
                <span
                  class="text-4xl"
                >{{ adminAnalyticsData.supportTrackerRadialBar.chartData.completedOrders }}</span>
              </p>
            </div>
          </div>
        </vx-card>
      </div>
    </div>

    <div class="vx-row">
      <!-- LINE CHART -->
      <div class="vx-col w-full mb-base">
        <vx-card title="Revenue">
          <template slot="actions">
            <feather-icon icon="SettingsIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
          </template>
          <div slot="no-body" class="p-6 pb-0">
            <div class="flex">
              <div class="mr-6">
                <p class="mb-1 font-semibold">This Month</p>
                <p class="text-3xl text-success">
                  <sup class="text-base mr-1">$</sup>86,589
                </p>
              </div>
              <div>
                <p class="mb-1 font-semibold">Last Month</p>
                <p class="text-3xl">
                  <sup class="text-base mr-1">$</sup>73,683
                </p>
              </div>
            </div>
            <vue-apex-charts
              type="line"
              height="266"
              :options="analyticsData.revenueComparisonLine.chartOptions"
              :series="analyticsData.revenueComparisonLine.series"
            />
          </div>
        </vx-card>
      </div>
    </div>

    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="Dispatched Orders">
          <div slot="no-body" class="mt-4">
            <vs-table :data="users">
              <template slot="thead">
                <vs-th>ORDER NO.</vs-th>
                <vs-th>STATUS</vs-th>
                <vs-th>OPERATORS</vs-th>
                <vs-th>LOCATION</vs-th>
                <vs-th>DISTANCE</vs-th>
                <vs-th>START DATE</vs-th>
                <vs-th>EST DELIVERY DATE</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].orderNo">
                    <span>#{{data[indextr].orderNo}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].status">
                    <span class="flex items-center px-2 py-1 rounded">
                      <div
                        class="h-3 w-3 rounded-full mr-2"
                        :class="'bg-' + data[indextr].statusColor"
                      ></div>
                      {{data[indextr].status}}
                    </span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <ul class="users-liked user-list">
                      <li v-for="(user, userIndex) in data[indextr].usersLiked" :key="userIndex">
                        <vx-tooltip :text="user.name" position="bottom">
                          <vs-avatar
                            :src="require(`@/assets/images/portrait/small/${user.img}`)"
                            size="30px"
                            class="border-2 border-white border-solid -m-1"
                          ></vs-avatar>
                        </vx-tooltip>
                      </li>
                    </ul>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{data[indextr].location}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{data[indextr].distance}}</span>
                    <vs-progress
                      :percent="data[indextr].distPercent"
                      :color="data[indextr].statusColor"
                    ></vs-progress>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{data[indextr].startDate}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{data[indextr].estDelDate}}</span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import analyticsData from "@/views/ui-elements/card/analyticsData.js";
import adminAnalyticsData from "@/views/admin/analyticsData.js";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import ChangeTimeDurationDropdown from "@/components/ChangeTimeDurationDropdown.vue";
export default {
  data() {
    return {
      analyticsData,
      adminAnalyticsData,
      users: [
        {
          orderNo: 879985,
          status: "Moving",
          statusColor: "success",
          operator: "Cinar Knowles",
          operatorImg: "avatar-s-2.png",
          usersLiked: [
            {
              name: "Vennie Mostowy",
              img: "avatar-s-5.png"
            },
            {
              name: "Elicia Rieske",
              img: "avatar-s-7.png"
            },
            {
              name: "Julee Rossignol",
              img: "avatar-s-10.png"
            },
            {
              name: "Darcey Nooner",
              img: "avatar-s-8.png"
            }
          ],
          location: "Anniston, Alabama",
          distance: "130 km",
          distPercent: 80,
          startDate: "14:58 26/07/2018",
          estDelDate: "28/07/2018"
        },
        {
          orderNo: 156897,
          status: "Pending",
          statusColor: "warning",
          operator: "Britany Ryder",
          operatorImg: "avatar-s-4.png",
          usersLiked: [
            {
              name: "Trina Lynes",
              img: "avatar-s-1.png"
            },
            {
              name: "Lilian Nenez",
              img: "avatar-s-2.png"
            },
            {
              name: "Alberto Glotzbach",
              img: "avatar-s-3.png"
            }
          ],
          location: "Cordova, Alaska",
          distance: "234 km",
          distPercent: 60,
          startDate: "14:58 26/07/2018",
          estDelDate: "28/07/2018"
        },
        {
          orderNo: 568975,
          status: "Moving",
          statusColor: "success",
          operator: "Kishan Ashton",
          operatorImg: "avatar-s-1.png",
          usersLiked: [
            {
              name: "Lai Lewandowski",
              img: "avatar-s-6.png"
            },
            {
              name: "Elicia Rieske",
              img: "avatar-s-7.png"
            },
            {
              name: "Darcey Nooner",
              img: "avatar-s-8.png"
            },
            {
              name: "Julee Rossignol",
              img: "avatar-s-10.png"
            },
            {
              name: "Jeffrey Gerondale",
              img: "avatar-s-9.png"
            }
          ],
          location: "Florence, Alabama",
          distance: "168 km",
          distPercent: 70,
          startDate: "14:58 26/07/2018",
          estDelDate: "28/07/2018"
        },
        {
          orderNo: 245689,
          status: "Canceled",
          statusColor: "danger",
          operator: "Anabella Elliott",
          operatorImg: "avatar-s-6.png",
          usersLiked: [
            {
              name: "Vennie Mostowy",
              img: "avatar-s-5.png"
            },
            {
              name: "Elicia Rieske",
              img: "avatar-s-7.png"
            }
          ],
          location: "Clifton, Arizona",
          distance: "125 km",
          distPercent: 95,
          startDate: "14:58 26/07/2018",
          estDelDate: "28/07/2018"
        }
      ]
    };
  },
  components: {
    StatisticsCardLine,
    VueApexCharts,
    ChangeTimeDurationDropdown
  }
};
</script>

<style lang="scss">
#admin-analytics {
  .greet-user {
    position: relative;

    .decore-left {
      position: absolute;
      left: 0;
      top: 0;
    }

    .decore-right {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  @media (max-width: 576px) {
    .decore-left,
    .decore-right {
      width: 140px;
    }
  }
}
</style>
