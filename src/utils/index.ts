import { useEffect, useRef, useState } from "react";
import { baseUrl } from "@/constants/index";
import { LaunchInfo, RequestConfig } from "@/types";

export const formatQueryStr = (
  query: Record<string, string | number>
): string => {
  return Object.entries(query)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join("&");
};

export const timeout = (n: number) => new Promise((res) => setTimeout(res, n));

export const replaceUrlPath = (
  url: string,
  pathObj: Record<string, string | number>
) => {
  return url
    .split("/")
    .map((i) => {
      if (i.includes(":")) {
        return pathObj[i.substring(1)];
      }
      return i;
    })
    .join("/");
};

export const request = async <T>({
  url,
  data,
  params,
  path,
  headers,
}: RequestConfig): Promise<T | undefined> => {
  try {
    let [method, requestUrl] = url.trim().split(" ");
    method = method.toLocaleUpperCase();
    if (path) {
      requestUrl = replaceUrlPath(requestUrl, path);
    }

    if (method === "GET" && params) {
      requestUrl = `${requestUrl}?${formatQueryStr(params)}`;
    }

    const res = await fetch(`${baseUrl}${requestUrl}`, {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    const jsonData = await res.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

export const useRequest = <T>(requestConfig: RequestConfig) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);

  const fetchData = async (params: RequestConfig) => {
    setLoading(true);
    const res = await request<T>(params ?? requestConfig);
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(requestConfig);
  }, []);

  return {
    data: data,
    run: fetchData,
    loading,
  };
};

export const useRequestList = <T>(requestConfig: RequestConfig) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (params: RequestConfig) => {
    setLoading(true);
    const res = await request<T>(params ?? requestConfig);
    if (res) {
      if (params?.config?.refresh) {
        setData([res]);
      } else {
        setData(data.length ? [...data, res] : [res]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(requestConfig);
  }, []);

  return {
    data: data,
    run: fetchData,
    loading,
  };
};

export const mergeClassNames = (...names: Array<string | undefined>) => {
  return names.filter((i) => i != null).join(" ");
};

export const useScrollBottom = (
  element: HTMLElement | null,
  onBottom: () => Promise<void>
) => {
  const loadingRef = useRef(false);
  const fetchData = async () => {
    loadingRef.current = true;
    await onBottom();
    loadingRef.current = false;
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersectionEntry = entries[0];
        if (intersectionEntry.isIntersecting) {
          console.log("loading", loadingRef.current);
          !loadingRef.current && fetchData();
        }
      },
      {
        rootMargin: "80px",
        threshold: 0.8,
      }
    );

    if (observer && element) {
      observer.observe(element);
    }

    return () => {
      element && observer && observer.unobserve(element);
      observer && observer.disconnect();
    };
  }, [element, onBottom]);
};

export const getImgUrl = (launchInfo: LaunchInfo): string | null => {
  try {
    const links = launchInfo.links;
    return links.flickr.original[0] ?? links.patch.small ?? links.patch.large;
  } catch (error) {
    return null;
  }
};
