/*
if (typeof import.meta !== 'undefined')
{
    import { create, globals } from 'webgpu';
    Object.assign(globalThis, globals);
}
*/

class class_buffertest_webgpu
{

// -------------------- Shaders
// Shader code for Compute shader "BufferTest"
static ShaderCode_BufferTest = `
@binding(0) @group(0) var<storage, read> InputTyped_0 : array<f32>;

@binding(1) @group(0) var<storage, read_write> OutputTyped_0 : array<f32>;

struct Struct_BufferTestCB_std140_0
{
    @align(16) alpha1_0 : f32,
    @align(4) alpha2_0 : f32,
    @align(8) gain_0 : f32,
    @align(4) _padding0_0 : f32,
};

@binding(4) @group(0) var<uniform> _BufferTestCB_0 : Struct_BufferTestCB_std140_0;
struct Struct_TestStruct_std430_0
{
    @align(16) TheFloat4_0 : vec4<f32>,
    @align(16) TheInt4_0 : vec4<i32>,
    @align(16) TheBool_0 : u32,
};

@binding(2) @group(0) var<storage, read> InputStructured_0 : array<Struct_TestStruct_std430_0>;

@binding(3) @group(0) var<storage, read_write> OutputStructured_0 : array<Struct_TestStruct_std430_0>;

struct Struct_TestStruct_0
{
     TheFloat4_0 : vec4<f32>,
     TheInt4_0 : vec4<i32>,
     TheBool_0 : u32,
};

fn unpackStorage_0( _S1 : Struct_TestStruct_std430_0) -> Struct_TestStruct_0
{
    var _S2 : Struct_TestStruct_0 = Struct_TestStruct_0( _S1.TheFloat4_0, _S1.TheInt4_0, _S1.TheBool_0 );
    return _S2;
}

fn packStorage_0( _S3 : Struct_TestStruct_0) -> Struct_TestStruct_std430_0
{
    var _S4 : Struct_TestStruct_std430_0 = Struct_TestStruct_std430_0( _S3.TheFloat4_0, _S3.TheInt4_0, _S3.TheBool_0 );
    return _S4;
}

@compute
@workgroup_size(64, 1, 1)
fn Main(@builtin(global_invocation_id) DTid_0 : vec3<u32>)
{
    var _S5 : u32 = DTid_0.x;
    var n_minus_2_0 : f32;
    if(_S5 >= u32(2))
    {
        n_minus_2_0 = InputTyped_0[_S5 - u32(2)];
    }
    else
    {
        n_minus_2_0 = 0.0f;
    }
    var n_minus_1_0 : f32;
    if(_S5 >= u32(1))
    {
        n_minus_1_0 = InputTyped_0[_S5 - u32(1)];
    }
    else
    {
        n_minus_1_0 = 0.0f;
    }
    OutputTyped_0[_S5] = _BufferTestCB_0.gain_0 * (InputTyped_0[_S5] + _BufferTestCB_0.alpha1_0 * n_minus_1_0 + _BufferTestCB_0.alpha2_0 * n_minus_2_0);
    if(_S5 == u32(0))
    {
        var s_0 : Struct_TestStruct_0 = unpackStorage_0(InputStructured_0[i32(0)]);
        s_0.TheFloat4_0[i32(0)] = s_0.TheFloat4_0[i32(0)] + 0.10000000149011612f;
        s_0.TheFloat4_0[i32(1)] = s_0.TheFloat4_0[i32(1)] + 0.20000000298023224f;
        s_0.TheFloat4_0[i32(2)] = s_0.TheFloat4_0[i32(2)] + 0.30000001192092896f;
        s_0.TheFloat4_0[i32(3)] = s_0.TheFloat4_0[i32(3)] + 0.40000000596046448f;
        s_0.TheInt4_0[i32(0)] = s_0.TheInt4_0[i32(0)] + i32(1);
        s_0.TheInt4_0[i32(1)] = s_0.TheInt4_0[i32(1)] + i32(2);
        s_0.TheInt4_0[i32(2)] = s_0.TheInt4_0[i32(2)] + i32(3);
        s_0.TheInt4_0[i32(3)] = s_0.TheInt4_0[i32(3)] + i32(4);
        s_0.TheBool_0 = u32(!bool(s_0.TheBool_0));
        OutputStructured_0[i32(0)] = packStorage_0(s_0);
    }
    return;
}

`;

// -------------------- Private Members

// Constant buffer _BufferTestCB
#constantBuffer__BufferTestCB = null;

// Compute Shader BufferTest
#ShaderModule_Compute_BufferTest = null;
#Pipeline_Compute_BufferTest = null;
#BindGroupLayout_Compute_BufferTest = null;
#PipelineLayout_Compute_BufferTest = null;

// -------------------- Imported Members

// Buffer InputTypedBuffer : This is the buffer to be filtered.
buffer_InputTypedBuffer = null;
buffer_InputTypedBuffer_count = 0;
buffer_InputTypedBuffer_stride = 0;
buffer_InputTypedBuffer_usageFlags = GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE;

// Buffer InputStructuredBuffer
buffer_InputStructuredBuffer = null;
buffer_InputStructuredBuffer_count = 0;
buffer_InputStructuredBuffer_stride = 0;
buffer_InputStructuredBuffer_usageFlags = GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE;

// -------------------- Exported Members

// Buffer OutputTypedBuffer : An internal buffer used during the filtering process.
buffer_OutputTypedBuffer = null;
buffer_OutputTypedBuffer_count = 0;
buffer_OutputTypedBuffer_stride = 0;
buffer_OutputTypedBuffer_usageFlags = GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE;

// Buffer OutputStructuredBuffer
buffer_OutputStructuredBuffer = null;
buffer_OutputStructuredBuffer_count = 0;
buffer_OutputStructuredBuffer_stride = 0;
buffer_OutputStructuredBuffer_usageFlags = GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE;

// -------------------- Public Variables

variable_gain = 0.500000;  // Overall Volume Adjustment
variable_alpha1 = 1.000000;  // Adjusts the contribution of sample n-1
variable_alpha2 = 0.000000;  // Adjusts the contribution of sample n-2

ReportError(msg)
{
    console.log(msg);
    //alert(msg);
    throw new Error(msg);
}

Align(alignment, value)
{
    return (Math.floor((value + alignment - 1) / alignment) * alignment)
}

CopyToReadbackBuffer(device, encoder, buffer)
{
    let readbackBuffer = device.createBuffer({
        label: "Readback for " + buffer.label,
        size: buffer.size,
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });

    encoder.copyBufferToBuffer(buffer, 0, readbackBuffer, 0, buffer.size);

    return readbackBuffer;
}

async ReadbackBuffer(device, buffer, lambda)
{
    await buffer.mapAsync(GPUMapMode.READ);
    //await device.queue.onSubmittedWorkDone();
    let ret = buffer.getMappedRange();

    //let view = new DataView(ret);
    //alert(view.getFloat32(0));
    //alert(view.getFloat32(4));

    lambda(ret);
    buffer.unmap();
}

GetMessage()
{
    return "Hello from Module.js";
}

Init(device)
{
    // Create constant buffer _BufferTestCB
    this.constantBuffer__BufferTestCB = device.createBuffer({
        label: "buffertest_webgpu._BufferTestCB",
        size: 16,
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM,
    });

    // Initialize compute shader BufferTest
    {
        this.ShaderModule_Compute_BufferTest = device.createShaderModule({ code: class_buffertest_webgpu.ShaderCode_BufferTest, label: "Compute Shader BufferTest"});
        this.BindGroupLayout_Compute_BufferTest = device.createBindGroupLayout({
            label: "Compute Bind Group BufferTest",
            entries: [
                {
                    // InputTyped
                    binding: 0,
                    visibility: GPUShaderStage.COMPUTE,
                    buffer: { type: "read-only-storage" }
                },
                {
                    // OutputTyped
                    binding: 1,
                    visibility: GPUShaderStage.COMPUTE,
                    buffer: { type: "storage" }
                },
                {
                    // InputStructured
                    binding: 2,
                    visibility: GPUShaderStage.COMPUTE,
                    buffer: { type: "read-only-storage" }
                },
                {
                    // OutputStructured
                    binding: 3,
                    visibility: GPUShaderStage.COMPUTE,
                    buffer: { type: "storage" }
                },
                {
                    // _BufferTestCB
                    binding: 4,
                    visibility: GPUShaderStage.COMPUTE,
                    buffer: { type: "uniform" }
                },
            ]
        });
        this.PipelineLayout_Compute_BufferTest = device.createPipelineLayout({
            label: "Compute Bind Group Layout BufferTest",
            bindGroupLayouts: [this.BindGroupLayout_Compute_BufferTest],
        });
        this.Pipeline_Compute_BufferTest = device.createComputePipeline({
            label: "Compute Pipeline Layout BufferTest",
            layout: this.PipelineLayout_Compute_BufferTest,
            compute: {
                module: this.ShaderModule_Compute_BufferTest,
                entryPoint: "Main",
            }
        });
    }

    return true;
}

Execute(device, encoder)
{
    // Validate buffer InputTypedBuffer
    if (this.buffer_InputTypedBuffer === null)
        this.ReportError("Imported resource buffer_InputTypedBuffer was not provided");

    // Handle (re)creation of buffer OutputTypedBuffer
    {
        let baseCount = this.buffer_InputTypedBuffer_count;
        let desiredCount = ((baseCount + 0 ) * 1) / 1 + 0;
        let desiredStride = this.buffer_InputTypedBuffer_stride;
        if (this.buffer_OutputTypedBuffer !== null && (this.buffer_OutputTypedBuffer_count != desiredCount || this.buffer_OutputTypedBuffer_stride != desiredStride))
        {
            this.buffer_OutputTypedBuffer.destroy();
            this.buffer_OutputTypedBuffer = null;
        }

        if (this.buffer_OutputTypedBuffer === null)
        {
            this.buffer_OutputTypedBuffer_count = desiredCount;
            this.buffer_OutputTypedBuffer_stride = desiredStride;
            this.buffer_OutputTypedBuffer = device.createBuffer({
                label: "buffertest_webgpu.OutputTypedBuffer",
                size: this.Align(16, this.buffer_OutputTypedBuffer_count * this.buffer_OutputTypedBuffer_stride),
                usage: this.buffer_OutputTypedBuffer_usageFlags,
            });
        }
    }

    // Validate buffer InputStructuredBuffer
    if (this.buffer_InputStructuredBuffer === null)
        this.ReportError("Imported resource buffer_InputStructuredBuffer was not provided");

    // Handle (re)creation of buffer OutputStructuredBuffer
    {
        let baseCount = this.buffer_InputStructuredBuffer_count;
        let desiredCount = ((baseCount + 0 ) * 1) / 1 + 0;
        let desiredStride = this.buffer_InputStructuredBuffer_stride;
        if (this.buffer_OutputStructuredBuffer !== null && (this.buffer_OutputStructuredBuffer_count != desiredCount || this.buffer_OutputStructuredBuffer_stride != desiredStride))
        {
            this.buffer_OutputStructuredBuffer.destroy();
            this.buffer_OutputStructuredBuffer = null;
        }

        if (this.buffer_OutputStructuredBuffer === null)
        {
            this.buffer_OutputStructuredBuffer_count = desiredCount;
            this.buffer_OutputStructuredBuffer_stride = desiredStride;
            this.buffer_OutputStructuredBuffer = device.createBuffer({
                label: "buffertest_webgpu.OutputStructuredBuffer",
                size: this.Align(16, this.buffer_OutputStructuredBuffer_count * this.buffer_OutputStructuredBuffer_stride),
                usage: this.buffer_OutputStructuredBuffer_usageFlags,
            });
        }
    }

    // Upload values to constant buffer _BufferTestCB
    {
        let bufferCPU = new ArrayBuffer(16);
        let view = new DataView(bufferCPU);
        view.setFloat32(0, this.variable_alpha1); // alpha1
        view.setFloat32(4, this.variable_alpha2); // alpha2
        view.setFloat32(8, this.variable_gain); // gain
        view.setFloat32(12, 0); // _padding0
        device.queue.writeBuffer(this.constantBuffer__BufferTestCB, 0, bufferCPU);
    }

    // Run compute shader BufferTest
    {
        let bindGroup = device.createBindGroup({
            label: "Compute Bind Group BufferTest",
            layout: this.BindGroupLayout_Compute_BufferTest,
            entries: [
                {
                    // InputTyped
                    binding: 0,
                    resource: { buffer: this.buffer_InputTypedBuffer }
                },
                {
                    // OutputTyped
                    binding: 1,
                    resource: { buffer: this.buffer_OutputTypedBuffer }
                },
                {
                    // InputStructured
                    binding: 2,
                    resource: { buffer: this.buffer_InputStructuredBuffer }
                },
                {
                    // OutputStructured
                    binding: 3,
                    resource: { buffer: this.buffer_OutputStructuredBuffer }
                },
                {
                    // _BufferTestCB
                    binding: 4,
                    resource: { buffer: this.constantBuffer__BufferTestCB }
                },
            ]
        });

        let baseDispatchSize = [this.buffer_InputTypedBuffer_count, 1, 1];
        let dispatchSize = [
            Math.floor((Math.floor(((baseDispatchSize[0] + 0) * 1)) / 1 + 0 + 64 - 1) / 64),
            Math.floor((Math.floor(((baseDispatchSize[1] + 0) * 1)) / 1 + 0 + 1 - 1) / 1),
            Math.floor((Math.floor(((baseDispatchSize[2] + 0) * 1)) / 1 + 0 + 1 - 1) / 1)
        ];

        let computePass = encoder.beginComputePass();
            computePass.setPipeline(this.Pipeline_Compute_BufferTest);
            computePass.setBindGroup(0, bindGroup);
            computePass.dispatchWorkgroups(dispatchSize[0], dispatchSize[1], dispatchSize[2]);
        computePass.end();
    }

    return true;
}

};

buffertest_webgpu = new class_buffertest_webgpu;

/*
if (typeof import.meta !== 'undefined')
{
    export default new class_buffertest_webgpu;
}
*/