## **Here are examples of common errors to avoid**

./app/(dashboard)/tasks/grade/page.tsx
105:13  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element

./components/tasks/create/steps/TaskBasicInfo.tsx
23:9  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
24:22  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./components/tasks/create/steps/TaskGrading.tsx
24:9  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
25:22  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
40:40  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./components/tasks/create/steps/TaskRequirements.tsx
18:9  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
19:22  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./components/tasks/create/steps/TaskReview.tsx
8:9  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
