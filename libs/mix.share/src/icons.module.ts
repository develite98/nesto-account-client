import { NgModule } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  IconAdjustments,
  IconAdjustmentsHorizontal,
  IconApps,
  IconArrowBarLeft,
  IconArrowRampRight,
  IconBell,
  IconBrandGithub,
  IconChevronLeft,
  IconCircleCheck,
  IconCirclePlus,
  IconClipboardList,
  IconColorSwatch,
  IconColumns,
  IconComponents,
  IconCopy,
  IconDatabase,
  IconDeviceDesktopAnalytics,
  IconExternalLink,
  IconFile,
  IconFileAnalytics,
  IconFileHorizontal,
  IconFileImport,
  IconFileText,
  IconFilter,
  IconFolder,
  IconHelp,
  IconLanguage,
  IconLayout,
  IconLayoutSidebarRight,
  IconListNumbers,
  IconLockAccess,
  IconMaximize,
  IconMessageCircle,
  IconMinus,
  IconNews,
  IconNotebook,
  IconPalette,
  IconPhoto,
  IconPlus,
  IconSearch,
  IconSection,
  IconSettings,
  IconSettingsAutomation,
  IconShieldLock,
  IconShoppingCart,
  IconSitemap,
  IconSmartHome,
  IconSquare,
  IconSquareToggle,
  IconSquareX,
  IconStack2,
  IconTags,
  IconTool,
  IconTools,
  IconTrash,
  IconTypography,
  IconUser,
  IconUserCircle,
  IconUserExclamation,
  IconUsers,
  IconVectorTriangle,
  IconWand,
  IconWorld,
  IconWriting
} from 'angular-tabler-icons/icons';

export const ICONS = {
  IconUser,
  IconBell,
  IconHelp,
  IconTypography,
  IconApps,
  IconSquareX,
  IconLayoutSidebarRight,
  IconMaximize,
  IconBrandGithub,
  IconVectorTriangle,
  IconSmartHome,
  IconTool,
  IconWorld,
  IconSitemap,
  IconFile,
  IconAdjustmentsHorizontal,
  IconLanguage,
  IconPlus,
  IconListNumbers,
  IconUserExclamation,
  IconShieldLock,
  IconSettingsAutomation,
  IconNews,
  IconArrowBarLeft,
  IconSearch,
  IconTrash,
  IconCopy,
  IconWriting,
  IconCirclePlus,
  IconFileHorizontal,
  IconSettings,
  IconTools,
  IconComponents,
  IconPhoto,
  IconAdjustments,
  IconTags,
  IconChevronLeft,
  IconMinus,
  IconUsers,
  IconUserCircle,
  IconLayout,
  IconDatabase,
  IconStack2,
  IconFilter,
  IconMessageCircle,
  IconSquareToggle,
  IconShoppingCart,
  IconArrowRampRight,
  IconColumns,
  IconFileImport,
  IconFileText,
  IconDeviceDesktopAnalytics,
  IconSection,
  IconColorSwatch,
  IconSquare,
  IconFolder,
  IconNotebook,
  IconClipboardList,
  IconExternalLink,
  IconPalette,
  IconWand,
  IconCircleCheck,
  IconFileAnalytics,
  IconLockAccess
};

@NgModule({
  imports: [TablerIconsModule.pick(ICONS)],
  exports: [TablerIconsModule]
})
export class IconsModule {}
