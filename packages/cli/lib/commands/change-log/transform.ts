import execa from "execa";
import { join } from "path";
import { FilterMonorepoPackage } from "../../typing";
import { isMonorepo } from "../../common";
import { CWD } from "../../common/constant";

export function formatType(type: string) {
  const MAP: Record<string, string> = {
    fix: "Bug Fixes",
    feat: "Feature",
    docs: "Document",
    types: "Types",
  };

  return MAP[type] || type;
}

export const getPackagesInfo = (
  filter?: string
): FilterMonorepoPackage[] | false => {
  let data;
  if (filter) {
    data = execa.sync("node", [
      join(__dirname, "./execPackages.js"),
      "--name=" + filter,
    ]);
  } else {
    data = execa.sync("node", [join(__dirname, "./execPackages.js")]);
  }
  try {
    return JSON.parse(data.stdout);
  } catch (e) {
    return false;
  }
};

// 格式化代码
export function transform(item: any) {
  if (item.type === "chore" || item.type === "test") {
    return null;
  }
  item.type = formatType(item.type);
  if (isMonorepo()) {
    const pkgInfo = getPackagesInfo(item.scope);
    if (pkgInfo) {
      //   // 当前是一个monorepo的项目
      const first = pkgInfo[0];
      if (!first) return null;
      if (first.dir !== CWD) {
        return null;
      }
    } else {
      return null;
    }
  }

  if (item.hash) {
    item.shortHash = item.hash.slice(0, 6);
  }

  if (item.references.length) {
    item.references.forEach((ref: any) => {
      if (ref.issue && item.subject) {
        item.subject = item.subject.replace(` (#${ref.issue})`, "");
      }
    });
  }

  return item;
}
