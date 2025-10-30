import test from "@playwright/test";
import axios from "axios";

test("Test login --> API", async ({ page }) => {
  try {
    // Step 1: Request OTP
    const otpResponse = await axios.post(
      "https://apigw-rdp.honebi.online/gateway/authentication/customer/otp",
      {
        mobile: "9392477974",
        business_unit_id: "e6cfb4c8-b157-4039-9369-ec64b00dd0f7",
      }
    );

    const OTP = otpResponse.data.data?.otp;
    console.log("✅ OTP Received:", OTP);

    // Step 2: Verify OTP
    const verifyResponse = await axios.post(
      "https://apigw-rdp.honebi.online/gateway/authentication/customer/verify",
      {
        mobile: "9392477974",
        otp: OTP,
        business_unit_id: "e6cfb4c8-b157-4039-9369-ec64b00dd0f7",
      }
    );

    const verifyData = verifyResponse.data;

    // Extract token
    const token = verifyData?.data?.access_token || verifyData?.data?.token;
    if (!token) throw new Error("❌ Access token not found in verify response");

    // Common headers for all APIs
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Step 3: Default Entity Store
    const defaultEntityResponse = await axios.post(
      "https://apigw-rdp.honebi.online/gateway/business-units/default-entity",
      {
        latitude: "17.470032",
        longitude: "78.353417",
        business_unit_id: "e6cfb4c8-b157-4039-9369-ec64b00dd0f7",
        pincode: "500084",
      },
      { headers }
    );

    const defaultEntityStore = defaultEntityResponse.data?.data?.[0];
    if (!defaultEntityStore) throw new Error("❌ Default entity not found");

    console.log("🏪 STORES_ENTITYS:", defaultEntityStore.id);

    // Step 4: Customer Available Address
    try {
      const addressResponse = await axios.post(
        "https://apigw-rdp.honebi.online/gateway/customers/available-addresses",
        {
          customer_id: verifyData.data?.customer?.id,
          entity_id: defaultEntityStore.id,
          business_unit_id: defaultEntityStore.business_unit_id,
        },
        { headers }
      );

      console.log("🏠 Address Response:", addressResponse.data);
    } catch (error) {
      console.log("❌ Address Error:", error.response?.data || error.message);
    }

    // Step 5: Customer Address List ✅ FIXED (added headers)
    try {
      const customerAddressResponse = await axios.post(
        "https://apigw-rdp.honebi.online/gateway/addresses/list",
        {
          object_id: defaultEntityStore.address?.object_id,
          object_type:defaultEntityResponse.address?.object_type,
        },
        { headers } 
      );

      console.log("🏠 Customer Address List:", customerAddressResponse.data);
    } catch (error) {
      console.log("❌ Customer Address List Error:", error.response?.data || error.message);
    }

  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
});
