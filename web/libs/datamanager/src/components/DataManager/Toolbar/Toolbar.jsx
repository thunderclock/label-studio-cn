import { inject, observer } from "mobx-react";
import { Block } from "../../../utils/bem";
import { Space } from "../../Common/Space/Space";
import "./TabPanel.scss";
import { Button } from "../../Common/Button/Button";
import { useTranslation } from 'react-i18next';

const injector = inject(({ store }) => {
  return {
    store,
    interfaces: store.interfaces,
  };
});

export const Toolbar = injector(
  observer(({ store, interfaces }) => {
    const { t } = useTranslation();
    return (
      <Block name="tab-panel">
        {store.SDK.toolbarInstruments.map((section, i) => {
          return (
            <Space size="small" key={`section-${i}`}>
              {section.map((instrument, i) => {
                const Instrument = store.SDK.getInstrument(instrument);

                return Instrument ? <Instrument key={`instrument-${instrument}-${i}`} size="medium" /> : null;
              })}
            </Space>
          );
        })}
        <Space size="small">
          {interfaces.get("refresh") && (
            <Button
              onClick={() => {
                interfaces.get("refresh").onClick();
              }}
            >
              {t('projects.toolbar.refresh')}
            </Button>
          )}
          {interfaces.get("import") && (
            <Button
              onClick={() => {
                interfaces.get("import").onClick();
              }}
            >
              {t('projects.toolbar.import')}
            </Button>
          )}
          {interfaces.get("export") && (
            <Button
              onClick={() => {
                interfaces.get("export").onClick();
              }}
            >
              {t('projects.toolbar.export')}
            </Button>
          )}
          {interfaces.get("settings") && (
            <Button
              onClick={() => {
                interfaces.get("settings").onClick();
              }}
            >
              {t('projects.toolbar.settings')}
            </Button>
          )}
        </Space>
      </Block>
    );
  }),
);
