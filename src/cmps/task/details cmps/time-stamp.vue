
<template>
  <p class="time-stamp">{{ updatedAt }}</p>
</template>

<script>
export default {
  name: "time-stamp",
  props: ["time"],
  data() {
    return {
      updatedAt: null,
    };
  },
  created() {
    const currTime = Date.now();
    const timeToFormat = currTime - this.time;
    const diffHours = Math.floor(timeToFormat / (1000 * 3600));
    let timeToDisplay;

    if (diffHours < 0.5) timeToDisplay = "Just Now";
    else if (diffHours < 24) timeToDisplay = `h ${diffHours}`;
    else {
      if (diffHours / (24 * 7) < 1) timeToDisplay = `${Math.floor(diffHours/24)}d`;
      else if (diffHours / (24 * 30) < 1) timeToDisplay = `${Math.floor((diffHours / 24 * 7))}w`;
      else if (diffHours / (24 * 365) < 1) timeToDisplay = `${Math.floor(diffHours / (24 * 30))}m`;
      else timeToDisplay = `y ${Math.floor((diffHours / 24 * 365))}`;
    }

    this.updatedAt = timeToDisplay;
  },
};
</script>
