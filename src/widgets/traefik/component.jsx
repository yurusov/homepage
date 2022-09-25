import useSWR from "swr";
import { useTranslation } from "next-i18next";

import Widget from "components/services/widgets/widget";
import Block from "components/services/widgets/block";
import { formatProxyUrl } from "utils/api-helpers";

export default function Component({ service }) {
  const { t } = useTranslation();

  const config = service.widget;

  const { data: traefikData, error: traefikError } = useSWR(formatProxyUrl(config, "overview"));

  if (traefikError) {
    return <Widget error={t("widget.api_error")} />;
  }

  if (!traefikData) {
    return (
      <Widget>
        <Block label={t("traefik.routers")} />
        <Block label={t("traefik.services")} />
        <Block label={t("traefik.middleware")} />
      </Widget>
    );
  }

  return (
    <Widget>
      <Block label={t("traefik.routers")} value={traefikData.http.routers.total} />
      <Block label={t("traefik.services")} value={traefikData.http.services.total} />
      <Block label={t("traefik.middleware")} value={traefikData.http.middlewares.total} />
    </Widget>
  );
}