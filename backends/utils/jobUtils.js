function mapJobFields(rawJob) {
  return {
    externalID: rawJob.guid,
    title: rawJob.title,
    description: rawJob.description || rawJob["content:encoded"],
    url: rawJob.link,
  };
}

module.exports = {
  mapJobFields,
};
