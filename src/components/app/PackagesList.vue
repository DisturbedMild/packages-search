<template>
 <div class="packages-wrapper">
  <v-list>
   <base-pagination>
    <li
     v-for="page in pages"
     :key="page"
     @click="changePage(page)"
     :class="(currentPage === page) ? 'active' : ' '"
    >
     {{ page }}
    </li>
   </base-pagination>
   <package-item
    v-for="item in statsList"
    :key="item.name"
    :name="item.name"
    :type="item.type"
    :getStats="getPackegesStats"
    @render-package="renderPackageInfo"
   ></package-item>
  </v-list>

  <base-modal
   v-if="modalIsOpen"
   :name="name"
   :author="author"
   :description="description"
   :close="closeModal"
  >
   <template #heading>
    Package Name: <span>{{ name }}</span>
    <p v-if="version">
     Version: <span>{{ version }}</span>
    </p>
   </template>
   <template #body>
    <div>
     Links:
     <div class="link-item" v-if="packageLink">
      <a :href="packageLink" target="_blank">{{ packageLink }}</a>
     </div>
     <div class="links-wrapper" v-if="packageLinks">
      <div class="link-item" v-for="link in packageLinks" :key="link">
       <a :href="link" target="_blank">{{ link }}</a>
      </div>
     </div>
    </div>
    <div class="package-description">
     Desc: <br class="d-block" />
     {{ description }}
    </div>
   </template>
  </base-modal>
  <base-modal :mode="'error'" v-if="isError" :close="closeModal">
   <template #heading>
    <h4 class="h4">Error</h4>
   </template>
   <template #body>
    <p>{{ errorMessage }}</p>
   </template>
  </base-modal>
 </div>
</template>

<script>
import PackageItem from "./PackageItem.vue";

export default {
 components: {
  PackageItem,
 },
 data() {
  return {
   modalIsOpen: false,
   name: "-",
   author: "-",
   description: "-",
   version: 0,
   packageLink: "",
   packageLinks: [],
   isError: false,
   errorMessage:
    "Ooops... We didn't find anything about this package in our Library.",
   date: null,
   pages: [],
   statsList: [],
   isActive: false,
   currentPage: 1,
  };
 },
 props: ["getStats"],
 emits: ["renderPackage"],
 mounted() {
  this.getPackegesStats();
  this.changePage(1);
 },
 watch: {
   currentPage: function(newPage) {
     fetch(
       `https://data.jsdelivr.com/v1/stats/packages/week?limit=10&page=${newPage}`
     )
      .then((response) => response.json())
      .then((data) => this.renderStatsList(data));
   }
 },
 methods: {
  renderStatsList(list) {
   this.statsList = list;
   this.computePages(this.statsList);
  },
  getPackegesStats() {
   fetch(`https://data.jsdelivr.com/v1/stats/packages/week`)
    .then((response) => response.json())
    .then((data) => {
     this.renderStatsList(data);
    });
  },
  renderPackageInfo(packageName, type) {
   let filteredName = null;
   if (packageName[0] === "@") {
    filteredName = packageName.split("");
    filteredName.splice(0, 1);
    filteredName = filteredName.join("");
   }

   if (type === "npm" && packageName[0] === "@") {
    this.gitRequest(filteredName);
   } else if (type === "gh") {
    this.gitRequest(packageName);
   } else if (type === "npm") {
    this.npmRequest(packageName);
   }
  },

  gitRequest(name) {
   return fetch(`https://api.github.com/repos/${name}`)
    .then((response) => {
     if (!response.ok) {
      return;
     } else {
      return response.json();
     }
    })
    .then((data) => {
     this.assignGitPackageToModal(data);
    })
    .catch((err) => {
     console.log("Err: ", err);
     this.isError = true;
     console.log(this.isError);
    });
  },
  npmRequest(name) {
   return fetch(`https://api.npms.io/v2/package/${name}`)
    .then((response) => {
     if (!response.ok) {
      return;
     } else {
      return response.json();
     }
    })
    .then((data) => {
     this.assignNpmPackageToModal(data.collected.metadata);
    })
    .catch((err) => {
     console.log("Err: ", err);
     this.isError = true;
     console.log(this.isError);
    });
  },
  assignGitPackageToModal(packageInfo) {
   const { full_name, created_at, description, html_url } = packageInfo;
   this.name = full_name;
   this.date = created_at;
   this.description = description;
   this.packageLink = html_url;
   this.modalIsOpen = true;
   this.version = "";
  },
  assignNpmPackageToModal(packageInfo) {
   const {
    name,
    version,
    author,
    repository,
    description,
    links,
   } = packageInfo;
   if (!author) {
    this.author = "";
   } else {
    this.author = author.name;
   }
   this.name = name;
   this.version = version;
   this.description = description;

   this.repository = repository.url;
   this.packageLinks = [];
   for (let link in links) {
    this.packageLinks.push(links[link]);
   }

   this.modalIsOpen = true;
  },
  closeModal() {
   this.modalIsOpen = false;
   this.isError = false;
  },
  computePages(list) {
   const perPage = 10;
   const pagesCount = Math.ceil(list.length / perPage);

   for (let i = 1; i < pagesCount; i++) {
    this.pages.push(i);
   }
  },
  changePage(page) {
   fetch(
    `https://data.jsdelivr.com/v1/stats/packages/week?limit=10&page=${page}`
   )
    .then((response) => response.json())
    .then((data) => this.renderStatsList(data));
  },
 },
};
</script>
