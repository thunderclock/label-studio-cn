import { inject, observer } from "mobx-react";
import { IconChevronLeft } from "@humansignal/icons";
import { Block, Elem } from "../../../utils/bem";
import { Button } from "../../Common/Button/Button";
import { Icon } from "../../Common/Icon/Icon";
import { Filters } from "../Filters";
import "./FilterSidebar.scss";
import { Space } from "../../Common/Space/Space";
import { useTranslation } from 'react-i18next';

const sidebarInjector = inject(({ store }) => {
  const viewsStore = store.viewsStore;

  return {
    viewsStore,
    sidebarEnabled: viewsStore?.sidebarEnabled,
    sidebarVisible: viewsStore?.sidebarVisible,
  };
});

export const FiltersSidebar = sidebarInjector(
  observer(({ viewsStore, sidebarEnabled, sidebarVisible }) => {
    const { t } = useTranslation();
    return sidebarEnabled && sidebarVisible ? (
      <Block name="filters-sidebar">
        <Elem name="header">
          <Elem name="extra">
            <Button
              type="link"
              icon={<Icon icon={IconChevronLeft} width={24} height={24} />}
              onClick={() => viewsStore.collapseFilters()}
            />
          </Elem>
          <Elem name="title">{t('projects.filters.title')}</Elem>
        </Elem>
        <Space size="small" direction="vertical">
          <Space size="small">
            <Button
              onClick={() => {
                viewsStore.filters.apply();
              }}
            >
              {t('projects.filters.apply')}
            </Button>
            <Button
              onClick={() => {
                viewsStore.filters.reset();
              }}
            >
              {t('projects.filters.reset')}
            </Button>
          </Space>
          <input
            type="text"
            placeholder={t('projects.filters.search')}
            onChange={(e) => {
              viewsStore.filters.setSearch(e.target.value);
            }}
          />
        </Space>
        <Filters sidebar={true} />
      </Block>
    ) : null;
  }),
);
FiltersSidebar.displayName = "FiltersSidebar";
