import { Columns } from "../../../components/Columns/Columns";
import { Description } from "../../../components/Description/Description";
import { Block, cn } from "../../../utils/bem";
import { Elem } from "../../../utils/bem";
import { StorageSet } from "./StorageSet";
import "./StorageSettings.scss";
import { isInLicense, LF_CLOUD_STORAGE_FOR_MANAGERS } from "../../../utils/license-flags";
import { useTranslation } from "react-i18next";

const isAllowCloudStorage = !isInLicense(LF_CLOUD_STORAGE_FOR_MANAGERS);

export const StorageSettings = () => {
  const { t } = useTranslation();
  const rootClass = cn("storage-settings");

  return isAllowCloudStorage ? (
    <Block name="storage-settings">
      <Elem name={"wrapper"}>
        <h1>{t('settings.storage.title')}</h1>
        <Description>
          {t('settings.storage.description')}
        </Description>

        <Columns count={2} gap="40px" size="320px" className={rootClass}>
          <StorageSet
            title={t('settings.storage.source.title')}
            buttonLabel={t('settings.storage.source.button')}
            rootClass={rootClass}
          />

          <StorageSet
            title={t('settings.storage.target.title')}
            target="export"
            buttonLabel={t('settings.storage.target.button')}
            rootClass={rootClass}
          />
        </Columns>
      </Elem>
    </Block>
  ) : null;
};

StorageSettings.title = "云存储";
StorageSettings.path = "/storage";
